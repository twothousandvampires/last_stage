<template>
    <div id="wrap">
        <Info v-if="state === 1"></Info>
        <div v-if="state === 1" style="color: #7a6b5c; position: absolute; top:40%; left: 50%; transform: translate(-50%, -50%);display: flex;flex-direction: column; align-items: center;">
            <div>
                <img width="400px" height="auto" src="/preview/logo.png" alt="">
            </div>
            <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
                <img src="/preview/666.gif" alt="">
            </div>
            <div>
                <div v-if="lobbies_data.length" style="display: flex;flex-direction: row; gap: 24px; justify-content: center;">
                    <div :style="'background-color:' +  (data.started === 'true' || (data.players >= data.maxPlayers) ? '#3a0000' : '#8a2121') + ';padding: 20px 40px; color:#e0e07a;'" @click="connect(data)" class="button" v-for="data in lobbies_data">
                        <p>{{ data.name }}</p>
                        <p>{{ data.players }} / {{ data.maxPlayers }}</p>
                    </div>
                </div>
            </div>
        </div>    
        <GameCanvas v-else-if="state === 2"></GameCanvas> 
        <Lobby v-else-if="state === 3"></Lobby>
    </div>
</template>
<script setup>
    import '~/assets/css/main.css'

    import { ref } from 'vue';
    import { useNuxtApp } from '#app';
   
    let { $getInstance, $connectTo, $audio } = useNuxtApp();

    let state = ref(1)
    let lobbies_data = ref([])

    let socket = $getInstance()

    let connect = (data) => {
        if(data.started === 'true') return
        if(data.players >= data.maxPlayers) return

        $connectTo(data.port)
        socket = $getInstance()

        socket.on('connect_to_lobby', () => {
            state.value = 3
        })

        socket.on('start', () => {
            state.value = 2
        })
    }
    onMounted(() => {
        socket.on('lobbies_list', (data) => {
            lobbies_data.value = data
        })

        // $audio.lobby_back.play()

        socket.on('lobby_updated', (data) => {
            lobbies_data.value = data
        })

        socket.emit('get_lobbies')
    })
</script>