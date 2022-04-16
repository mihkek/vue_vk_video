(function() {
  if (!window.VK) {
    window.VK = {};
  }
  if (VK.VideoPlayer) {
    return;
  }

  var Events = {
    INITED: 'inited',
    TIMEUPDATE: 'timeupdate',
    VOLUMECHANGE: 'volumechange',
    STARTED: 'started',
    RESUMED: 'resumed',
    PAUSED: 'paused',
    ENDED: 'ended',
    ERROR: 'error'
  };

  var States = {
    UNINITED: 'uninited',
    UNSTARTED: 'unstarted',
    PLAYING: 'playing',
    PAUSED: 'paused',
    ENDED: 'ended',
    ERROR: 'error'
  };

  VK.VideoPlayer = function(iframe) {
    if (!isVkEmbedUrl(iframe.src)) {
      throw Error('iframe src is not a VK embed');
    }
    if (!/[?&]js_api=/.test(iframe.src)) {
      throw Error('iframe src js_api param is missing');
    }

    var state = {
      state: States.UNINITED,
      volume: 1,
      muted: false,
      time: 0,
      duration: 0
    };

    var listeners = {};
    var callsQueue = [];
    var targetOrigin = '*';

    window.addEventListener('message', receiveEvent);

    callMethod({ method: 'init' });

    return {
      play: function() {
        callMethod({ method: 'play' });
      },
      pause: function() {
        callMethod({ method: 'pause' });
      },
      seek: function(time) {
        callMethod({ method: 'seek', time: time });
      },
      setVolume: function(volume) {
        callMethod({ method: 'set_volume', volume: volume });
        state.volume = volume;
        state.muted = false;
      },
      getVolume: function() {
        return state.volume;
      },
      getCurrentTime: function() {
        return state.time;
      },
      getDuration: function() {
        return state.duration;
      },
      mute: function() {
        callMethod({ method: 'mute' });
        state.muted = true;
      },
      unmute: function() {
        callMethod({ method: 'unmute' });
        state.muted = false;
      },
      isMuted: function() {
        return state.muted;
      },
      getState: function() {
        return state.state;
      },
      on: function(event, callback) {
        listeners[event] = listeners[event] || [];
        listeners[event].push(callback);
      },
      off: function(event, callback) {
        const index = listeners[event] ? listeners[event].indexOf(callback) : -1;
        if (index > -1) {
          listeners[event].splice(index, 1);
        }
      },
      destroy: function() {
        window.removeEventListener('message', receiveEvent);
        listeners = {};
      }
    };

    function receiveEvent(event) {
      if (event.source !== iframe.contentWindow) {
        return;
      }
      if (targetOrigin === '*' && isVkEmbedUrl(iframe.src)) {
        targetOrigin = event.origin;
      }
      var eventType = event.data.event;
      switch (eventType) {
        case Events.INITED:
          state.state = event.data.state;
          state.time = event.data.time;
          state.duration = event.data.duration;
          state.volume = event.data.volume;
          triggerEvent(eventType);
          flushCallsQueue();
          break;
        case Events.TIMEUPDATE:
          state.time = event.data.time;
          triggerEvent(eventType);
          break;
        case Events.VOLUMECHANGE:
          state.volume = event.data.volume;
          state.muted = event.data.muted;
          triggerEvent(eventType);
          break;
        case Events.STARTED:
        case Events.RESUMED:
          state.state = States.PLAYING;
          state.time = event.data.time;
          triggerEvent(eventType);
          break;
        case Events.PAUSED:
        case Events.ENDED:
        case Events.ERROR:
          state.state = eventType;
          state.time = event.data.time;
          triggerEvent(eventType);
          break;
      }
    }

    function flushCallsQueue() {
      while (callsQueue.length) {
        const data = callsQueue.shift();
        callMethod(data);
      }
    }

    function callMethod(data) {
      if (state.state !== States.UNINITED || data.method === 'init') {
        iframe.contentWindow.postMessage(data, targetOrigin);
      } else {
        callsQueue.push(data);
      }
    }

    function triggerEvent(event) {
      var stateClone = cloneState();
      const eventListeners = listeners[event] || [];
      eventListeners.forEach(function(callback) {
        if (typeof callback === 'function') {
          try {
            callback(stateClone);
          } catch (error) {
            console.error(error);
          }
        }
      });
    }

    function cloneState() {
      var copy = {};
      for (var key in state) {
        copy[key] = state[key];
      }
      return copy;
    }
  };

  VK.VideoPlayer.Events = Events;
  VK.VideoPlayer.States = States;

  function isVkEmbedUrl(url) {
    return /^(https?:)?\/\/([a-zA-Z0-9\-_.]+\.)?vk\.com\/video_ext\.php\?/.test(url);
  }
})();
