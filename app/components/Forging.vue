<template>
    <div id="forge">
        <Stats :stats="data.stats" :triggers="data.triggers"></Stats>
        <div>
            <div style="display: flex;flex-direction: row; justify-content: center;align-items: center;gap: 10px">
                <div style="display: flex;flex-direction: column;">
                    <p style="font-size: 30px; color: gold;"
                    @mouseover="$title($event, 'Click on item for unlocking forgings. Cost depends on existing count.')"
                    @mouseleave="$closeTitle()"
                    >gold: {{ data.gold }}</p>

                    <p style="font-size: 30px; color: gold;"
                    @mouseover="$title($event, 'What is this for?')"
                    @mouseleave="$closeTitle()"
                    @click="showSparks()">
                    carved sparks: {{ data.carved_sparks }}
                    </p>
                </div>
            <p v-if="data.gold >= 60"
                @mouseover="$title($event, 'Pay 60 gold and get one grace.')"
                @mouseleave="$closeTitle()"
                @click="$socket.emit('donate')"
                style="font-size: 20px;cursor: pointer;"
                class="button">DONATE
            </p>
            <p v-if="data.can_buy"
            @mouseover="$title($event, 'Buy an item for 100 gold.')"
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
                        main_title: getUnlockCost(item),
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
                            @mouseover="$title($event, forge.description + '\n(upgrade cost: ' +  forge.cost + ')')"
                            @mouseleave="$closeTitle()"
                            @click="$socket.emit('forge_item', {
                                item_name: item.name,
                                forge: index
                            })">
                            {{ forge.name }} ({{ forge.value }})
                        </p>
                    </div>         
                </p>
            </div>
        </div>
        </div>
    </div>
    <div v-if="items.length" id="suggest">
        <p>choose one</p>
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
        <p>choose one</p>
        <div v-for="(forging, index) in forgings">
            
            <p
            class="button"
            @mouseover="$title($event, forging.description + '(upgrade cost: ' +  forging.cost + ')')"
            @mouseleave="$closeTitle()"
            @click="$socket.emit('pick_forging', id, index); forgings.length = 0">
            {{  forging.name }}
            </p>
        </div>
    </div>
    <div style="padding: 20px;" @click="show_sparks = false;" v-if="show_sparks" id="show-abilities">
        <div>
            <div>
                sparks: {{ data.carved_sparks }}
            </div>
            <input @click.stop="" v-model="sparks_amount" type="text">
            <p @click.stop="getGrandForging()">try</p>
        </div>
        <div @click.stop="selectGrandForging(grand_forging.name)" class="button" v-for="grand_forging in data.grand_forgings">
            <p>{{ grand_forging.name }}</p>
        </div>
        <div>
            <p v-if="grand_forging_name != ''">-> Choose item <-</p>
            <div class="button" v-for="item in data.items">
                <img
                    :class="{'button': grand_forging_name != ''}"
                    @mouseover="$title($event, {
                        main_title: item.name,
                        text: item.description
                    })"
                    @mouseleave="$closeTitle()" 
                    @click.stop="applyGrandForging(item.name)"
                    width="60px"
                    height="60px"
                    :src="`/icons/${item.name}.png`" alt=""
                >
            </div>
        </div>
        
    </div>
</template>
<script setup>
    const { $getInstance, $title, $closeTitle } = useNuxtApp();
    
    let $socket = $getInstance()
    const props = defineProps({
    data: {
        type: Object,
        required: true,
        },
    });

    let items = ref([])
    let forgings =  ref([])
    let id = ref(0)
    let show_sparks = ref(false)
    let sparks_amount = ref(0)
    let grand_forging_name = ref('')

    let showSparks = () => {
        show_sparks.value = !show_sparks.value
    }

    let getGrandForging = () => {
        let amount = sparks_amount
     
        $socket.emit('get_grand_forging', amount.value)
    }

    let getUnlockCost = (item) => {
        if(item.forge.length >= item.max_forgings) return 'maximum forgings'
        return 'forging unlock cost: ' + ((item.forge.length * 15) + 15)
    }

    let applyGrandForging = (item_name) => {
        console.log(grand_forging_name.value, item_name)
        $socket.emit('apply_grand_forging', grand_forging_name.value, item_name)
        grand_forging_name.value = ''
    }   

    let selectGrandForging = (name) => {
        grand_forging_name.value = name
    }

    $socket.on('suggest_items', (data) => {
        items.value = data
    })

    $socket.on('suggest_forgings', (data, item_id) => {
        id.value = item_id
        forgings.value = data
    })
    
</script>