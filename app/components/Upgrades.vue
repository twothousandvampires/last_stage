<template>
    <div id="upgrades">
        <div style="display: flex;flex-direction: row; justify-content: space-around;align-items: center;">
            <p>grace: {{ data.grace }}</p>
            <p v-if="data.can_hold" @click="$socket.emit('hold_grace')" style="font-size: 20px;cursor: pointer;" class="button" >HOLD</p>
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