<template>
        <div style="display: flex;flex-direction: column; min-width: 160px;">
            <div style="display: flex; flex-direction: row; align-items: center;justify-content: space-between;" v-for="(stat, key) in stats">
                <p>{{ key }}:</p>
                <p>{{ stat }}</p>
            </div>
        </div>
</template>
<script setup>
    const props = defineProps({
        stats: {
            type: Object,
            required: true,
        },
    });
</script>