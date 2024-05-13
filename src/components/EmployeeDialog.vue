<template>
    <v-dialog v-model="localDialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ dialogTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="localEditedItem.firstName" label="First Name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="localEditedItem.lastName" label="Last Name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="localEditedItem.position" label="Position"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="localEditedItem.department" label="Department"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1" text @click="emitClose">Cancel</v-btn>
                <v-btn color="blue-darken-1" text @click="emitSave">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
    dialog: Boolean,
    editedItem: {
        type: Object,
        default: () => ({ firstName: "", lastName: "", position: "", department: "" })
    }
});

const emit = defineEmits(['update:dialog', 'save', 'close']);

const localDialog = ref(props.dialog);
const localEditedItem = ref({ ...props.editedItem });

watch(() => props.dialog, (newVal) => {
    localDialog.value = newVal;
}, { immediate: true });

watch(() => props.editedItem, (newVal) => {
    localEditedItem.value = { ...newVal };
}, { deep: true, immediate: true });

const dialogTitle = computed(() => {
    return localEditedItem.value.firstName ? 'Edit Employee' : 'New Employee';
});

const emitSave = () => {
    emit('save', { ...localEditedItem.value });
    emit('close');
    console.log("save clicked",localEditedItem.value  )
};

const emitClose = () => {
    emit('update:dialog', false);
    emit('close');
};
</script>
