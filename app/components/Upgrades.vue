<template>
    <div id="upgrades">
        <div style="display: flex;flex-direction: row; justify-content: space-around;align-items: center;">
            <p>grace: {{ data.grace }}</p>
            <p>ascend: {{ data.ascend }}</p>
            <p v-if="data.free > 0">free: {{ data.free }}</p>
            <p v-if="data.can_hold"  
                @click="$socket.emit('hold_grace')"
                style="font-size: 20px;cursor: pointer;" 
                class="button"
                @mouseover="$title($event, {
                    text: 'you can not learn upgrades in this session but get 20% extra grace'
                })"
                @mouseleave="$closeTitle()" 
            >HOLD
            </p>
            <p v-if="data.ascend > 0 && data.grace > 0"
                @click="$socket.emit('hold_ascend')"
                style="font-size: 20px;cursor: pointer;"
                class="button" 
                @mouseover="$title($event, {
                    text: 'lose 1 ascend level to reroll upgrades'
                })"
                @mouseleave="$closeTitle()" 
            >REROLL</p>
            <p v-if="data.life >= 4"
                @click="$socket.emit('sacrifice')"
                style="font-size: 20px;cursor: pointer;"
                class="button" 
                @mouseover="$title($event, {
                    text: 'lose all life to get 1 grace'
                })"
                @mouseleave="$closeTitle()" 
            >sacrifice</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-around;">
            <div v-for="upgrade in data.upgrades" style="display: flex; flex-direction: column;align-items: center;">
                <img
                    class="button"
                    @mouseover="$title($event, {
                        main_title: upgrade.name,
                        text: upgrade.desc
                    })"
                    @mouseleave="$closeTitle()" 
                    @click="$socket.emit('select_upgrade', upgrade.name)"
                    width="60px"
                    height="60px"
                    :src="`/icons/${upgrade.name}.png`" alt="">
                    <p>
                    {{ upgrade.name }}({{ upgrade.cost }})
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
    const { $socket, $title, $closeTitle } = useNuxtApp();
    const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    });
</script>