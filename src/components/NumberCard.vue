<template>
  <v-card class="number-card d-flex">
    <div class="count-column">
      <div class="number">{{ count }}</div>
    </div>
    <div class="icon-label-column">
      <v-icon :size="65" color="#f79202">{{ icon }}</v-icon>
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
  background-color: #fffdfd;
  color: #f79202;
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  border-radius: 8px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 0 10px;
}

.count-column {
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #505050;
}

.icon-label-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.number {
  font-size: 2.5rem;
}

.label {
  font-size: 1rem;
  color: #505050;
}
</style>
