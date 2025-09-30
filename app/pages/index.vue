<template>
    <div id="wrap">
        <Info v-if="!game_is_started"></Info>
        <GameCanvas @end="game_is_started = false" v-if="game_is_started"></GameCanvas> 
        <Lobby v-else></Lobby>
    </div>
</template>
<script setup>
    import '~/assets/css/main.css'

    import { ref } from 'vue';
    import { useNuxtApp } from '#app';
   
    const { $socket } = useNuxtApp();

    let game_is_started = ref(false)

     onMounted(() => {
        $socket.on('start', () => {
            game_is_started.value = true
            console.log(game_is_started.value)
        })
     })
</script>