<template>
    <v-card>
        <v-card-text>
            <v-text-field v-if="editMode" label="First Name" v-model="editableEmployee.firstName"
                :rules="[v => !!v || 'First Name is required']" :error-messages="firstNameErrors"
                @input="validateFirstName"></v-text-field>
            <div v-else>First Name: {{ editableEmployee.firstName }}</div>

            <v-text-field v-if="editMode" label="Last Name" v-model="editableEmployee.lastName"
                :rules="[v => !!v || 'Last Name is required']" :error-messages="lastNameErrors"
                @input="validateLastName"></v-text-field>
            <div v-else>Last Name: {{ editableEmployee.lastName }}</div>

            <v-select v-if="editMode" label="Gender" :items="genderOptions" v-model="editableEmployee.gender" chips></v-select>
            <div v-else>Gender: {{ editableEmployee.gender }}</div>

            <v-text-field v-if="editMode" label="Position" v-model="editableEmployee.position"></v-text-field>
            <div v-else>Position: {{ editableEmployee.position }}</div>

            <v-select v-if="editMode" label="Department" :items="departmentOptions" v-model="editableEmployee.department" chips></v-select>
            <div v-else>Department: {{ editableEmployee.department }}</div>

            <v-select v-if="editMode" label="Status" :items="statusOptions" v-model="editableEmployee.status" chips></v-select>
            <div v-else>Status: {{ editableEmployee.status }}</div>

            <v-text-field v-if="editMode" label="Start Date" type="date" v-model="editableEmployee.startDate"
                :rules="[v => !!v || 'Start Date is required']" :error-messages="startDateErrors"
                @input="validateStartDate"></v-text-field>
            <div v-else>Start Date: {{ editableEmployee.startDate }}</div>

            <v-text-field v-if="editMode" label="Date of Birth" type="date"
                v-model="editableEmployee.dateOfBirth"></v-text-field>
            <div v-else>Date of Birth: {{ editableEmployee.dateOfBirth }}</div>

            <div v-if="editMode">Address:
                <v-text-field label="Street" v-model="editableEmployee.address.street"></v-text-field>
                <v-text-field label="House Number" v-model="editableEmployee.address.houseNumber"></v-text-field>
                <v-text-field label="Zip Code" v-model="editableEmployee.address.zipCode"></v-text-field>
                <v-text-field label="City" v-model="editableEmployee.address.city"></v-text-field>
            </div>
            <div v-else>Address:
                <div>Street: {{ editableEmployee.address.street }}</div>
                <div>House Number: {{ editableEmployee.address.houseNumber }}</div>
                <div>Zip Code: {{ editableEmployee.address.zipCode }}</div>
                <div>City: {{ editableEmployee.address.city }}</div>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="primary" @click.stop="saveChanges" v-if="editMode">Save Employee</v-btn>
            <v-btn color="error" @click.stop="cancelEdit" v-if="editMode">Cancel</v-btn>
            <v-btn color="primary" @click.stop="toggleEditMode" v-else>Edit Employee</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { genderOptions, statusOptions, departmentOptions } from '@/utils/selectOptions';

export default defineComponent({
    name: 'EmployeePublicProfile',
    props: {
        employee: {
            type: Object,
            required: true
        }
    },
    setup(props, { emit }) {
        const editableEmployee = reactive({
            firstName: '',
            lastName: '',
            position: '',
            department: '',
            status: '',
            startDate: '',
            dateOfBirth: '',
            address: {
                street: '',
                houseNumber: '',
                zipCode: '',
                city: ''
            },
            gender: ''
        });

        const editMode = ref(false);

        const firstNameErrors = ref<string[]>([]);
        const lastNameErrors = ref<string[]>([]);
        const startDateErrors = ref<string[]>([]);

        watch(() => props.employee, (newVal) => {
            if (newVal) {
                Object.assign(editableEmployee, newVal);
            }
        }, { immediate: true, deep: true });

        function toggleEditMode() {
            if (!editMode.value) {
                editMode.value = true;
            } else {
                saveChanges();
            }
        }

        function validateFirstName() {
            firstNameErrors.value = editableEmployee.firstName ? [] : ['First Name is required'];
        }

        function validateLastName() {
            lastNameErrors.value = editableEmployee.lastName ? [] : ['Last Name is required'];
        }

        function validateStartDate() {
            startDateErrors.value = editableEmployee.startDate ? [] : ['Start Date is required'];
        }

        function saveChanges() {
            validateFirstName();
            validateLastName();
            validateStartDate();

            if (!firstNameErrors.value.length && !lastNameErrors.value.length && !startDateErrors.value.length) {
                console.log("Saving changes for:", editableEmployee);
                emit('update-employee', { ...editableEmployee });
                editMode.value = false;
            }
        }

        function cancelEdit() {
            if (props.employee) {
                Object.assign(editableEmployee, props.employee);  // Reset editableEmployee to the last known props
            }
            editMode.value = false;  // Exit edit mode
        }

        return {
            editableEmployee,
            editMode,
            toggleEditMode,
            saveChanges,
            cancelEdit,
            firstNameErrors,
            lastNameErrors,
            startDateErrors,
            validateFirstName,
            validateLastName,
            validateStartDate,
            genderOptions,
            statusOptions,
            departmentOptions
        };
    }
});
</script>
