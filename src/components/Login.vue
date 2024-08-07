<template>
  <div>
    <div ref='vantaRef'>
      <!-- Foreground content here -->
    </div>
    <div class="jyk_login_title">景元奎</div>
    <div class="jyk_login_describe">Welcome to my system!</div>
  </div>
  

  
</template>

<script>
import * as THREE from 'three'
import BIRDS from 'vanta/src/vanta.birds'
export default {
  mounted() {
    this.setScreenHeight();

    this.vantaEffect = BIRDS({
      el: this.$refs.vantaRef,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: this.screenHeight,
      minWidth: 200.00,
      maxWidth: this.screenWidth,
      scale: 1.00,
      scaleMobile: 1.00
    })
  },
  data(){
      return{
          screenHeight: 0,    // 屏幕高度
          screenWidth: 0      // 屏幕宽度
      }
  },

  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },

  methods: {
    // 设置屏幕高度和宽度
    setScreenHeight() {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth
    }
  } 
}
</script>

<style>
.jyk_login_title {
  z-index: 999;
  position: fixed;
  top: 40%;
  left: 15%;
  color: white;
  font-size: 100px;
  font-weight: bolder;
}

.jyk_login_describe {
  z-index: 999;
  position: fixed;
  top: 60%;
  left: 15%;
  color: white;
  font-size: 40px;
  font-weight: bolder;
}
</style>
