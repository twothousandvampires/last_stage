<template>
    <div id="upgrades">
        <Stats :stats="data.stats"></Stats>
        <div>
            <div style="display: flex;flex-direction: row; justify-content: space-around;align-items: center;">
                <p style="font-size: 20px;"
                @mouseover="$title($event, {
                        text: 'This is spent on learning abilities.'
                })"
                @mouseleave="$closeTitle()"
                >grace - <span style="color: #8a0e0e;">{{ data.grace }}</span>
                </p>
                <p style="font-size: 20px;"
                @mouseover="$title($event, {
                        text: 'You receive this when you learn skills, it affects the power of the improvements you can get.'
                })"
                @mouseleave="$closeTitle()"
                >ascent - <span style="color: #8a0e0e;">{{ data.ascend }}</span></p>
                <p style="font-size: 20px;"
                @mouseover="$title($event, {
                        text: 'You can learn for free, do not increase ascent level.'
                })"
                @mouseleave="$closeTitle()"
                 v-if="data.free > 0"
                 >free upgrades- <span style="color: #8a0e0e;">{{ data.free }}</span>
                </p>
            </div>
            <div style="display: flex; flex-direction: row;">
                <p v-if="data.ascend > 0 && data.can_hold"
                    @click="$socket.emit('hold_ascend')"
                    style="font-size: 20px;cursor: pointer;"
                    class="button" 
                    @mouseover="$title($event, {
                        text: 'Pay 1 ascent point to reroll upgrades.'
                    })"
                    @mouseleave="$closeTitle()" 
                    >reroll
                </p>
                <p v-if="data.life >= 1 && data.can_hold"
                    @click="$socket.emit('sacrifice')"
                    style="font-size: 20px;cursor: pointer;"
                    class="button" 
                    @mouseover="$title($event, {
                        text: 'Lose all life and get equals amount of grace, you can not learn upgrades in this time.'
                    })"
                    @mouseleave="$closeTitle()" 
                    >sacrifice
                </p>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-around;">
                <div v-for="upgrade in data.upgrades" style="display: flex; flex-direction: column;align-items: center; min-width: 160px;">
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
                            {{ upgrade.name }}
                        </p>
                        <p style="font-size: 14px;">
                           Cost: {{ upgrade.cost }}
                        </p>
                </div>
           </div>
        </div>
    </div>
</template>
<script setup>
import Stats from './Stats.vue';

    const { $getInstance, $title, $closeTitle } = useNuxtApp();

    let $socket = $getInstance()

    const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    });
</script>