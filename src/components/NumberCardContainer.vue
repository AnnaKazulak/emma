<template>
    <!-- <v-card> -->
        <v-container>
            <v-row>
                <v-col
                    v-for="(card, index) in cards"
                    :key="card.label"
                    :cols="12" :sm="6" :md="6" :lg="6"
                    draggable="true"
                    @dragstart="dragStart(index, $event)"
                    @dragover.prevent
                    @drop="drop(index, $event)"
                >
                    <NumberCard :icon="card.icon" :count="card.count" :label="card.label" />
                </v-col>
            </v-row>
        </v-container>
    <!-- </v-card> -->
</template>


<script setup>
import { ref, defineProps } from 'vue';
import NumberCard from './NumberCard.vue';

const props = defineProps({
    cards: Array
});

const cards = ref(props.cards);
let draggedIndex = -1;

function dragStart(index, event) {
    draggedIndex = index;
    event.dataTransfer.effectAllowed = 'move';
}

function drop(targetIndex, event) {
    const draggedItem = cards.value.splice(draggedIndex, 1)[0];
    cards.value.splice(targetIndex, 0, draggedItem);
}

function dragOver(event) {
    event.target.classList.add('drag-over');
}

function dragLeave(event) {
    event.target.classList.remove('drag-over');
}

</script>


<style scoped>
.v-col {
    display: flex;
    justify-content: center;
    cursor: grab;
    transition: transform 0.2s;
}

.v-col:active {
    cursor: grabbing;
}

.v-col.drag-over {
    border: 2px dashed #000;
}
</style>
