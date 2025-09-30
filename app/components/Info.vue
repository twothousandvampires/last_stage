<template>
  <div id="top-panel">
    <p style="margin-right: 16px;" @click="show_info = !show_info">info</p>
    <p>records</p>
    <GameInfo v-if="show_info" @click="show_info = false"></GameInfo> 
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  let show_info = ref(false)
</script>