<template>
        <div style="display: flex;flex-direction: column; min-width: 160px;">
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
</template>
<script setup>
    const { $title, $closeTitle } = useNuxtApp();
    let showStat = (event, desc) =>{
        if(!desc) return

        $title(event, desc)
    }
    const props = defineProps({
        stats: {
            type: Object,
            required: true,
        },
    });
</script>