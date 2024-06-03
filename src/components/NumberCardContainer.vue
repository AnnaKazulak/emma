<template>
  <div>
    <v-row>
      <v-col v-for="(card, index) in cards" :key="card.label" cols="12" sm="6" draggable="true"
        @dragstart="dragStart(index, $event)" @dragover.prevent @drop="drop(index, $event)"
        @dragenter.prevent="dragOver($event)" @dragleave="dragLeave($event)">
        <NumberCard :icon="card.icon" :count="card.count" :label="card.label" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
// import NumberCard from './NumberCard.vue'; 

// Define props
const props = defineProps({
  cards: {
    type: Array,
    required: true
  }
});

// Create a reactive copy of the props.cards array
const cards = ref([...props.cards]);

// Watch for changes in props.cards and update the reactive cards array
watch(
  () => props.cards,
  (newCards) => {
    cards.value = [...newCards];
  },
  { deep: true }
);

let draggedIndex = -1;

function dragStart(index: number, event: DragEvent) {
  draggedIndex = index;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
  }
}

function drop(targetIndex: number) {
  const draggedItem = cards.value.splice(draggedIndex, 1)[0];
  cards.value.splice(targetIndex, 0, draggedItem);
}

function dragOver(event: DragEvent) {
  const target = event.target as HTMLElement | null;
  if (target) {
    target.classList.add('drag-over');
  }
}

function dragLeave(event: DragEvent) {
  const target = event.target as HTMLElement | null;
  if (target) {
    target.classList.remove('drag-over');
  }
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
