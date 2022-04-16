<template>
  <div>
    <iframe v-if="loaded"
            :id="IframeId"
            :src="src"
            :width="width"
            :height="height"
            :frameborder="frameborder"
            :allowfullscreen="allowfullscreen"></iframe>
  </div>
</template>

<script>
import { createSrc } from "./functions"
import "./vk_api"



export default {
  name: "VkVideoPlayer",
  props: {
    IframeId:        { type: String, required: true },
    iframeCode:      { type: String, required: true },
    width:           { required: false, default: "480" },
    height:          { required: false, default: "480" },
    allowfullscreen: { required: false, default: false },
    frameborder:     { required: false, default: "0" }
  },
  emits: ['play', 'pause', 'ended'],
  data(){
    return {
      src: "",
      loaded: false,
      VK_Player: null
    }
  },
  methods: {
    play(){
      this.VK_Player.play()
      this.$emit('play')
    },
    pause(){
      this.VK_Player.pause()
      this.$emit('pause')
    },
    onEnd(){
      this.$emit('ended')
    },
  },
  mounted(){
    this.src = createSrc(this.iframeCode)
    if(!this.src) return

    this.loaded = true
    window.addEventListener('DOMContentLoaded', function() {
         const iframe = document.getElementById(this.IframeId)
         this.VK_Player = VK.VideoPlayer(iframe);
         this.VK_Player.on(VK.VideoPlayer.Events.ENDED, function() {
             this.onEnd()
         }.bind(this))
    }.bind(this))
  }
}
</script>
