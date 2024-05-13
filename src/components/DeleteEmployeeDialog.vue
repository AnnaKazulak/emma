<template>
    <v-dialog v-model="props.dialog" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Confirm Delete</v-card-title>
            <v-card-text>
                Are you sure you want to delete this employee: {{ employee?.firstName }} {{ employee?.lastName }}?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="confirmDelete">Delete</v-btn>
                <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    dialog: Boolean,
    employee: Object
});

const emit = defineEmits(['update:dialog', 'delete']);


const confirmDelete = () => {
    emit('delete', props.employee);
    emit('update:dialog', false);
};

const cancel = () => {
    emit('update:dialog', false);
};
</script>