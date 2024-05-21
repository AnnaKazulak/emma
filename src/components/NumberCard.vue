<template>
    <v-card class="number-card d-flex">
      <div class="count-column">
        <div class="number">{{ count }}</div>
      </div>
      <div class="icon-label-column">
        <v-icon :size="56" color="white">{{ icon }}</v-icon>
        <div class="label">{{ label }}</div>
      </div>
    </v-card>
  </template>
  
  <script setup>
  defineProps({
    icon: String,
    count: Number,
    label: String
  });
  </script>
  
  <style scoped>
  .number-card {
    background-color: #505050; /* Dark grey background */
    color: white; /* White text color */
    width: 240px;
    height: 140px;
    display: flex;
    flex-direction: row; /* Align children in a row */
    align-items: center;
    justify-content: space-between;
    text-align: center;
    border-radius: 8px;
    box-shadow: 4px 4px 10px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 0 10px; /* Padding for inner spacing */
  }
  
  .count-column {
    flex: 1; /* Take up half the space */
    display: flex;
    justify-content: center;
    font-size: 2.5rem; /* Larger number size */
    font-weight: bold;
  }
  
  .icon-label-column {
    flex: 1; /* Take up the other half */
    display: flex;
    flex-direction: column; /* Stack icon and label vertically */
    align-items: center; /* Center align items */
  }
  
  .number {
    font-size: 2.5rem; /* Make sure the size is prominent */
  }
  
  .label {
    font-size: 1rem; /* Appropriate size for label */
  }
  </style>
  