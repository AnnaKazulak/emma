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
                            <v-text-field v-model="localEditedItem.firstName" label="First Name"
                                :rules="[v => !!v || 'First Name is required']" :error-messages="firstNameErrors"
                                @input="validateFirstName"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="localEditedItem.lastName" label="Last Name"
                                :rules="[v => !!v || 'Last Name is required']" :error-messages="lastNameErrors"
                                @input="validateLastName"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="localEditedItem.startDate" label="Start Date" type="date"
                                :rules="[v => !!v || 'Start Date is required']" :error-messages="startDateErrors"
                                @input="validateStartDate"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="localEditedItem.gender" :items="['Male', 'Female', 'Divers']"
                                label="Gender"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="localEditedItem.status" :items="['Active',
                                'Part-Time',
                                'Remote',
                                'On Leave',
                                'On Probation',
                                'Suspended']" label="Status"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="localEditedItem.position" label="Position"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="localEditedItem.department" label="Department" :items="[
                                'Engineering', 'HR', 'Marketing',
                                'Sales', 'Finance', 'Legal', 'IT', 'Other', 'AI', 'UX', 'Design'
                            ]"></v-select>
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
        default: () => ({ id: null, firstName: "", lastName: "", position: "", department: "" })
    }
});

const emit = defineEmits(['update:dialog', 'save', 'close']);

const localDialog = ref(props.dialog);
const localEditedItem = ref({ ...props.editedItem });

const firstNameErrors = ref<string[]>([]);
const lastNameErrors = ref<string[]>([]);
const startDateErrors = ref<string[]>([]);

watch(() => props.dialog, (newVal) => {
    localDialog.value = newVal;
}, { immediate: true });

watch(() => props.editedItem, (newVal) => {
    localEditedItem.value = { ...newVal };
}, { deep: true, immediate: true });

const dialogTitle = computed(() => {
    return localEditedItem.value.firstName ? 'Edit Employee' : 'New Employee';
});

const validateFirstName = () => {
    firstNameErrors.value = localEditedItem.value.firstName ? [] : ['First Name is required'];
};

const validateLastName = () => {
    lastNameErrors.value = localEditedItem.value.lastName ? [] : ['Last Name is required'];
};

const validateStartDate = () => {
    startDateErrors.value = localEditedItem.value.startDate ? [] : ['Start Date is required'];
};

const emitSave = () => {
    validateFirstName();
    validateLastName();
    validateStartDate();

    if (!firstNameErrors.value.length && !lastNameErrors.value.length && !startDateErrors.value.length) {
        emit('save', { ...localEditedItem.value });
        emit('close');
    }
};

const emitClose = () => {
    emit('update:dialog', false);
    emit('close');
};
</script>
