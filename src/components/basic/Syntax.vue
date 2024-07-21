<template>
  <div>

    <!-- v-if -->
    <h1 v-if="useVif"> hahaJYK </h1>
    <h1 v-else> JYKnoHaha </h1>

    <button @click="changeHaha">DjySB</button>
    <!-- <h1> hahaJYK </h1> -->
    
  </div>
</template>

<script>

export default {
  name: 'Syntax',
  data() {
    return{
      useVif: true
    }
  },
  methods: {
    changeHaha() {
      this.useVif =! this.useVif;
    }
  }
}
</script>