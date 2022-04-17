## vue_vk_video

### Package for integrate vk-video to your project on vue-3 with programming controll of video
### It's works only on vue3!
### It's not the final version! I will modificate it!

### Based on [gavr-pavel/vk-video-js-api-demo](https://github.com/gavr-pavel/vk-video-js-api-demo)  

#### With this package you can integrate video from vk with programming controll, like play, pause, cathing\emiting different events
## Install
    npm install vue_vk_video
   
   Or clone this repository
   
## Import
 import VkVideoPlayer from "vue_vk_video"
 
    export default {
      name: 'App',
      components: {
        VkVideoPlayer
      },



## Usage
    <vk-video-player iframeCode='<iframe src="https://vk.com/video_ext.php?oid=-65772109&id=456241918&hash=e7bac5dc7167d152&hd=2" width="853" height="480" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>'
                             IframeId="vk_video_1"
                             @ended="endVk()"/>
## Props

For usage player, you must have Iframe code from player on vk.

![image](https://user-images.githubusercontent.com/63155780/163725971-5c979e30-be3a-4349-9982-97267fe660e7.png)


   1. IframeId ( Your id for access from code. Default 'vk_video' )
   2. iframeCode ( IFrame code from vk)
   3. width         
   4. height        
   5. allowfullscreen
   6. frameborder


## Methods
   1. Play()
   2. Pause()
    
## Events

  1. @play
  2. @pause
  3. @ended
