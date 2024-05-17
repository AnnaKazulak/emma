<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import { VSelect, VBtn, VTextField } from 'vuetify/components';

const props = defineProps({
    statusOptions: Array,
    departmentOptions: Array,
    initialFilters: Object
});

const emit = defineEmits(['updateFilters', 'resetFilters']);

const statusFilter = ref<string[]>([]);
const positionFilter = ref<string>('');
const departmentFilter = ref<string[]>([]);

// Immediate watch to handle changes in initial filters
watch(() => props.initialFilters, (newFilters) => {
    if (newFilters) {
        statusFilter.value = newFilters.status || [];
        positionFilter.value = newFilters.position || '';
        departmentFilter.value = newFilters.department || [];
    }
}, { deep: true, immediate: true });

watch([statusFilter, positionFilter, departmentFilter], () => {
    emit('updateFilters', {
        status: statusFilter.value,
        position: positionFilter.value,
        department: departmentFilter.value
    });
}, { deep: true });

</script>



<template>
    <v-select label="Filter by Status" v-model="statusFilter" @change="updateFilters" :items="props.statusOptions"
        outlined dense multiple chips>
    </v-select>

    <v-text-field label="Filter by Position" v-model="positionFilter" @input="updateFilters" outlined
        dense></v-text-field>

    <v-select label="Filter by Department" v-model="departmentFilter" @change="updateFilters"
        :items="props.departmentOptions" outlined dense multiple chips>
    </v-select>

    <v-btn color="primary" @click="$emit('resetFilters')" class="ma-2" text>Reset Filters</v-btn>
</template>
