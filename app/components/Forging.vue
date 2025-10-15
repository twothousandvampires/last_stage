<template>
    <div id="forge">
        <Stats :stats="data.stats"></Stats>
        <div>
            <div style="display: flex;flex-direction: row; justify-content: center;align-items: center;gap: 10px">
            <p>gold: {{ data.gold }}</p>
            <p v-if="data.gold >= 20"
                @mouseover="$title($event, 'lose 20g for getting 1 grace')"
                @mouseleave="$closeTitle()"
                @click="$socket.emit('donate')"
                style="font-size: 20px;cursor: pointer;"
                class="button">DONATE
            </p>
            <p v-if="data.can_buy"
            @mouseover="$title($event, 'buy item for 100g')"
            @mouseleave="$closeTitle()"
            @click="$socket.emit('buy')" 
            style="font-size: 20px;cursor: pointer;"
            class="button"> BUY ITEM
            </p>
        </div>
        <div style="grid-template-columns: 220px 220px; display: grid;">
            <div v-for="item in data.items" style="display: flex; flex-direction: column;align-items: center;">
                <img
                    :class="item.forge.length < item.max_forgings ? 'button' : ''"
                    @mouseover="$title($event, {
                        main_title: item.name,
                        text: item.description
                    })"
                    @mouseleave="$closeTitle()" 
                        @click="$socket.emit('unlock_forging', item.name); item.length = 0"
                        width="60px"
                        height="60px"
                        :src="`/icons/${item.name}.png`" alt="">
                        <p>
                    {{ item.name }}
                    <div style="display: flex; flex-direction: column;">
                        <p  :style="forge.can ? '' : 'background-color: red'" v-for="(forge, index) in item.forge"
                            class="button"
                            @mouseover="$title($event, forge.description)"
                            @mouseleave="$closeTitle()"
                            @click="$socket.emit('forge_item', {
                                item_name: item.name,
                                forge: index
                            })">
                            {{ forge.name }}
                        </p>
                    </div>         
                </p>
            </div>
        </div>
        </div>
    </div>
    <div v-if="items.length" id="suggest">
        <div v-for="(item, index) in items">
            <img
            class="button"
            @mouseover="$title($event, item.description)"
            @mouseleave="$closeTitle()"
            @click="$socket.emit('buy_item', index); items.length = 0"
            :src="`/icons/${item.name}.png`" alt="">
        </div>
    </div>
    <div v-if="forgings.length" id="suggest">
        <div v-for="(forging, index) in forgings">
            <p
            class="button"
            @mouseover="$title($event, forging.description)"
            @mouseleave="$closeTitle()"
            @click="$socket.emit('pick_forging', id, index); forgings.length = 0">
            {{  forging.name }}
            </p>
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

    let items = ref([])
    let forgings =  ref([])
    let id = ref(0)

    $socket.on('suggest_items', (data) => {
        console.log(data)
        items.value = data
    })

    $socket.on('suggest_forgings', (data, item_id) => {
        id.value = item_id
        forgings.value = data
    })

</script>