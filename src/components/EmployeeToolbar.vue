<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  addNewItem: () => void;
}>();

const emit = defineEmits(['update:search']);

const search = ref('');

watch(search, (newSearch) => {
  emit('update:search', newSearch);
});
</script>

<template>
  <v-toolbar>
    <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-btn class="mb-2" color="primary" dark @click="props.addNewItem">Add Employee</v-btn>
  </v-toolbar>
</template>

