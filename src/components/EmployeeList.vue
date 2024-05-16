<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";

const props = defineProps<{
  employees: Employee[];
  selected: Employee[];
  headers: any[];
}>();

const emit = defineEmits(['editItem', 'deleteItem']);

interface Employee {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
}

const handleEdit = (item: Employee) => {
  emit('editItem', item);
};

const handleDelete = (item: Employee) => {
  emit('deleteItem', item);
};
</script>

<template>
  <v-data-table v-model="props.selected" :headers="props.headers" :items="props.employees" item-key="lastName">
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="handleEdit(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="handleDelete(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

