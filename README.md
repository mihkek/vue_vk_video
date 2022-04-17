# vue_vk_video

# Package for integrate vk-video to your project on vue-3 with programm controll of video
# It's works only on vue3!
# It's not the final version! I wil modificate it


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

For usage player, you must have Iframe code from player on vk. See more 

   1. IframeId ( Your id for access from code. Default 'vk_video' )
   2. iframeCode ( IFrame code from vk)
   3. width         
   4. height        
   5. allowfullscreen
   6. frameborder
    
## Events

  1. @play
  2. @pause
  3. @ended
