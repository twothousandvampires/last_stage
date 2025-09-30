<template>
    <div id="canvas-wrap">
        <div id="hud">
            <div id="skill_icons">
              <div v-for="(ability, key) in client.abilities">
                <img :class="{'cannot_use': !client.can_use[key]}" width="60px" height="60px" :src="`/icons/${ability}.png`" alt="">
              </div>
            </div>
            <div id="player_stats" >
                <p> {{ client.energy }} / {{ client.max_energy }}</p>
                <p> {{ getLife(client) }}</p>
            </div>
            <div id="meta_info" >
                <div id="time">
                    {{ meta.ms / 1000 }}
                </div>
                <div id="killed">
                    {{ meta.killed }}
                </div>
            </div>
        </div>
        <div style="filter:saturate(83%);justify-content: center;">
            <canvas id="canvas" width="480px" height="480px"></canvas>
        </div>
        <div id ="status">
            <div v-for="status in statuses">
                <img 
                @mouseleave="$closeTitle()" @mouseover="$title($event, {'main_title': status.name, 'text': status.desc})"
                width="60px" height="60px" :title="status.desc" :src="`/icons/${status.name}.png`" alt="">
            </div>
        </div>
    </div>
    <Upgrades v-if="show_upgrades" :data="upgrade_data"></Upgrades>
    <Forging v-if="show_forging" :data="forging_data"></Forging>
</template>
<script setup>
    import Render from '~/render/Render';
    import { useNuxtApp } from '#app';
    import { reactive } from 'vue';
   
    const { $socket, $audio, $title, $closeTitle } = useNuxtApp();

    let client = reactive({
        life: 0,
        energy: 0,
        max_energy: 0,
        abilities: []
    })

    let show_upgrades = ref(false)
    let upgrade_data = reactive({})

    let show_forging = ref(false)
    let forging_data = reactive({})

    let statuses = ref([])
    let meta = reactive({})

    let updateClientData = (data) => {
        if(!data) return
      
        client.life = data.life_status
        client.max_energy = data.max_resource
        client.energy = data.resource
        client.abilities = data.abilities
        client.can_use = data.can_use
        client.warded = data.ward
    }

    let getLife = (client) => {
        if(client.warded){
            return 'warded'
        }
        else if(client.life > 4){
            return 'blessed'
        }
        else if(client.life === 4){
            return 'good'
        }
        else if(client.life === 3){
            return 'damaged'
        }
        else if(client.life === 2){
            return 'injured'
        }
        else if(client.life === 1){
            return "at death's door"
        }
        else{
            return "dead"
        }
    }

    const emit = defineEmits(['end']);

    onMounted(() => {
        let render = new Render($socket)

        $socket.on('tick_data', (server_data, server_time) => {
            let client = render.actors.get($socket.id)
            $audio.updateData(server_data, client)
            render.updateData(server_data)
            meta = server_data.meta
            updateClientData(client)
        })

        $socket.on('new_status', (data) => {
            statuses.value = statuses.value.filter(elem => elem.name != data.name)
            statuses.value.push(data)
            if(data.duration){
                setTimeout(() => {
                    $closeTitle()
                    statuses.value = statuses.value.filter(elem => elem.name != data.name)
                }, data.duration)
            }
        })

        $socket.on('game_is_over', () => {
            location.reload()
        })

        $socket.on('status_end', (status_name) => {
            statuses.value = statuses.value.filter(elem => elem.name != status_name)
        })
        
        $socket.on('show_upgrades', (data) => {
            show_upgrades = true
            upgrade_data = data
        })

        $socket.on('show_forgings', (data) => {
            show_forging = true
            forging_data = data
        })

        $socket.on('close_forgings', () => {
            show_forging = false
            forging_data = {}
        })

        $socket.on('close_upgrades', () => {
            show_upgrades = false
            upgrade_data = {}
        })
        let tick = 0

        setInterval(() => {
            render.draw()
            tick ++
            
            if(tick % 2 === 0){
                $socket.emit('inputs', render.input.getInputs())
            }
        }, 30)
    })

</script>