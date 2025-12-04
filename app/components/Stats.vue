<template>
    <div style="display: flex; flex-direction: column;">
        <div style="display: flex; flex-direction: row;">
            <div class="button" @click="show = 'stats'">
                stats
            </div>
            <div class="button" @click="show = 'triggers'">
                triggers
            </div>
        </div>
        <div v-if="show == 'stats'" style="display: flex;flex-direction: column; min-width: 160px;">
            <div style="display: flex; flex-direction: row; align-items: center;justify-content: space-between;" v-for="(stat, key) in stats.stats">
                <p 
                style="font-size: 14px; cursor: pointer;"
                @mouseover="showStat($event, stats.descriptions[key])"
                @mouseleave="$closeTitle()"
                >
                {{ key }}:
                </p>
                <p style="font-size: 14px;"><span style="color: #8a0e0e;">{{ stat }}</span></p>
            </div>
        </div>
        <div v-else >
            <div v-for="(value, key, index) in triggers">
                <div v-if="triggers[key].length != 0">
                    <p style="font-size: 26px;color: rgb(138, 14, 14);">{{ key }}</p>
                    <div style="display: flex; flex-direction: row; align-items: center;" v-for="trigger in triggers[key]">
                       <p
                       @mouseover="showStat($event, trigger.description)"
                       @mouseleave="$closeTitle()"
                       style="cursor: pointer; font-size: 14px;"
                       >{{ trigger.name }}</p>
                       <p>{{ (trigger.cd ? trigger.cd : 0) / 1000 }} sec / {{ trigger.chance }} %</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
</template>
<script setup>


    const { $title, $closeTitle, $getInstance } = useNuxtApp();
    let showStat = (event, desc) =>{
        if(!desc) return

        $title(event, desc)
    }

    let show = ref('stats')
  
    const props = defineProps({
        stats: {
            type: Object,
            required: true,
        },
        triggers: {
            type: Object,
            required: true,
        },
    });
</script>