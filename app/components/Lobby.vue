<template>
    <div id="lobby">
        <div class="item_pull">
            <div v-for="item in item_pull">
                <img class="button"
                    @mouseleave="$closeTitle()"
                    @mouseover="$title($event, {'main_title': item.name, 'text':item.description})" 
                    @click="pickItem(item.name)"
                    width="60px"
                    height="60px"
                    :src="`/icons/${item.name}.png`"
                    alt="">
                </img>
            </div>
        </div>
        <div v-if="lobby_data.length" class="abilities_pull">
            <div style="display: flex; align-items: center;">
                <div v-for="ability in lobby_data[0].template.abilities.filter(elem => elem.type === 1 && !elem.selected)">
                    <img 
                     class="button"
                     @mouseleave="$closeTitle()" @mouseover="$title($event, {'main_title': ability.name, 'text': ability.desc})"
                     @click="selectSkill(ability.name)" width="60px" height="60px" :src="`/icons/${ability.name}.png`" alt="">
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <div v-for="ability in lobby_data[0].template.abilities.filter(elem => elem.type === 2 && !elem.selected)">
                    <img 
                     class="button"
                     @mouseleave="$closeTitle()" @mouseover="$title($event, {'main_title': ability.name, 'text': ability.desc})"
                     @click="selectSkill(ability.name)" width="60px" height="60px" :src="`/icons/${ability.name}.png`" alt="">
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <div v-for="ability in lobby_data[0].template.abilities.filter(elem => elem.type === 3 && !elem.selected)">
                    <img 
                     class="button"
                     @mouseleave="$closeTitle()" @mouseover="$title($event, {'main_title': ability.name, 'text': ability.desc})"
                     @click="selectSkill(ability.name)" width="60px" height="60px" :src="`/icons/${ability.name}.png`" alt="">
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <div v-for="ability in lobby_data[0].template.abilities.filter(elem => elem.type === 4 && !elem.selected)">
                    <img 
                     class="button"
                     @mouseleave="$closeTitle()" @mouseover="$title($event, {'main_title': ability.name, 'text': ability.desc})"
                     @click="selectSkill(ability.name)" width="60px" height="60px" :src="`/icons/${ability.name}.png`" alt="">
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <div v-for="ability in lobby_data[0].template.abilities.filter(elem => elem.type === 5 && !elem.selected)">
                    <img 
                     class="button"
                     @mouseleave="$closeTitle()" @mouseover="$title($event, {'main_title': ability.name, 'text': ability.desc})"
                     @click="selectSkill(ability.name)" width="60px" height="60px" :src="`/icons/${ability.name}.png`" alt="">
                </div>
            </div>
        </div>
        <div :class="(value.ready ? 'player_ready' : 'player') + ` player${key + 1}`" v-for="(value, key) in lobby_data" :key="key">
            <div class="right_block">
                <div class="right_top" :style="value.ready ? 'background-color: #7a7a3a' : ''">
                    <div class="select_and_preview">
                        <img width="160px" height="160px" :src="`/preview/${value.template.name}.gif`" alt="{{value.template.name}}">
                    </div>
                    <div class="select_ready_equip">
                        <select @change="($event) => {$socket.emit('change_class', $event.target.value)}" style="visibility: visible; position: static; width: 100%;" name="" id="">
                            <option value="swordman">swordman</option>
                            <option value="flyer">flyer</option>
                            <option value="cultist">cultist</option>
                        </select>
                        <div class="equip_and_image">
                            <p>equip</p>
                            <div v-for="item in value.template.item">
                                <img
                                class="button"
                                @click="unpickItem(item.name)"
                                width="60px"
                                height="60px"
                                :src="`/icons/${item.name}.png`"
                                @mouseleave="$closeTitle()"
                                @mouseover="$title($event, {'main_title': item.name, 'text':item.description})"
                                alt="">
                            </div>
                        </div>
                        <p style="width: 100%;" class="button" @click="ready()">{{ value.ready ? 'cancel' : 'ready' }}</p>
                    </div>
                </div>
                <div class="right_bottom" v-if="lobby_data.length">
                    <div class="selected_skill_div" v-for="selected in lobby_data[0].template.abilities.filter(elem => elem.selected)">
                        <p>{{ getSkillType(selected.type) }}</p>
                        <img 
                        width="60px"
                        height="60px" 
                        @mouseleave="$closeTitle()"
                        @mouseover="$title($event, {'main_title': selected.name, 'text': selected.desc})"
                        :src="`/icons/${selected.name}.png`" 
                        alt="">
                    </div>
                </div>
            </div>
            <div class="left_block">
                <div class="stat_wrap">
                    <div v-if="value.is_player" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; width: 60%;">
                        <p @mouseover="$title($event,'load stats, items and abilities')" @mouseleave="$closeTitle()" class="button" @click="loadBuild(value.template.name)">load</p>
                        <p @mouseover="$title($event,'save stats, items and abilities')" @mouseleave="$closeTitle()" class="button" @click="saveBuild(value.template.name, value.template)">save</p>
                    </div>
                    <p>remain stat points : {{ value.template.stat_count }}</p>
                    <div class="stat" v-for="(stat_value, key) in value.template.stats">
                        <p class="button" v-if="value.is_player" @click="decreaseStat(key)">-</p>
                        <p
                        @mouseover="$title($event, value.template.stats_description[key])"
                        @mouseleave="$closeTitle()"
                        class="button">
                            {{ key }} : {{ stat_value }}
                        </p>
                        <p class="button" v-if="value.is_player" @click="increaseStat(key)">+</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useNuxtApp } from '#app';
   
    const { $getInstance, $audio, $title, $closeTitle } = useNuxtApp();

    let lobby_data = ref([])
    let $socket = $getInstance()
    
    let increaseStat = (stat) => {
        $socket.emit('increase_stat', stat)
    }

    let decreaseStat = (stat) => {
        $socket.emit('decrease_stat', stat)
    }

    let ready = () =>{
        $socket.emit('player_ready')
    }

    let pickItem = (item_name) => {
        $audio.setSound('menu item take')
        $closeTitle()
        $socket.emit('pick_item', item_name)
    }

    let unpickItem = (item_name) => {
        $audio.setSound('menu item drop')
        $closeTitle()
        $socket.emit('unpick_item', item_name)
    }

    let selectSkill = (skill_name) => {
        $audio.setSound('select_skill')
        $closeTitle()
        $socket.emit('select_skill', skill_name)
    }

    let getSkillType = (type) => {
        if(type === 1) return 'main'
        else if(type === 2) return 'secondary'
        else if(type === 3) return 'finisher'
        else if(type === 4) return 'utility'
        else if(type === 5) return 'passive'
    }

     let loadBuild = (name) => {
        let b = JSON.parse(localStorage.getItem(name))
        if(b){
            $socket.emit('load_template', b)
            $closeTitle()
        }
    }

    let saveBuild = (name, item) => {
        if(!name || !item) return
        localStorage.setItem(name, JSON.stringify(item))
    }

    let item_pull = ref([])
   
    onMounted(() => {
        $closeTitle()

        $socket.emit('get_lobby_data')

        $socket.on('update_lobby_data', (data, items) => {
            data.sort((a, b) => a.id === $socket.id ? - 1 : 1)

            lobby_data.value = []
            
            data.forEach(element => {
                if(element.id === $socket.id) element.is_player = true
                lobby_data.value.push(element)
            });

            item_pull.value = []
            items.forEach(elem => item_pull.value.push(elem))
        })
    })
</script>