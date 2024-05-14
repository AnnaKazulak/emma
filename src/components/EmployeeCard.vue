<template>
    <v-card class="text-center" max-width="300">
      <!-- User Image -->
      <v-avatar size="120" class="mx-auto mt-4">
        <img :src="employee.image" :alt="`${employee.firstName} ${employee.lastName}`">
      </v-avatar>
  
      <!-- User Info -->
      <v-card-title class="text-center">{{ employee.firstName }} {{ employee.lastName }}</v-card-title>
      <v-card-subtitle class="pb-0 text-center">{{ employee.position }}</v-card-subtitle>
      <v-card-subtitle class="pt-0 pb-1 text-center">{{ employee.department }}</v-card-subtitle>
      <v-btn color="teal" class="white--text" @click="sendMsg(employee)">See details</v-btn>
      <!-- Actions -->
      <v-card-actions class="justify-center pb-4">
        
        <v-btn icon class="ma-2" @click="editItem(employee)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon class="ma-2" @click="deleteItem(employee)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    employee: {
      type: Object,
      required: true,
      default: () => ({
        firstName: '',
        lastName: '',
        position: '',
        department: '',
        image: 'https://picsum.photos/id/68/200/300'
      })
    }
  });
  
  const emit = defineEmits(['edit', 'delete', 'sendMsg']);
  
  function editItem(employee) {
    emit('edit', employee);
  }
  
  function deleteItem(employee) {
    emit('delete', employee);
  }
  
  function sendMsg(employee) {
    emit('sendMsg', employee); // Example for extending functionality
  }
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .v-avatar img {
    border-radius: 50%;
  }
  
  .v-btn {
    border-radius: 8px;
  }
  
  .v-icon {
    color: #666;
  }
  </style>
  