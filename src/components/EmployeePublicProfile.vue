<template>
    <v-card>
        <v-card-text>
            <v-text-field v-if="editMode" label="First Name" v-model="employee.firstName"></v-text-field>
            <div v-else>First Name: {{ employee.firstName }}</div>

            <v-text-field v-if="editMode" label="Last Name" v-model="employee.lastName"></v-text-field>
            <div v-else>Last Name: {{ employee.lastName }}</div>

            <v-text-field v-if="editMode" label="Position" v-model="employee.position"></v-text-field>
            <div v-else>Position: {{ employee.position }}</div>

            <v-text-field v-if="editMode" label="Department" v-model="employee.department"></v-text-field>
            <div v-else>Department: {{ employee.department }}</div>

            <v-select v-if="editMode" label="Status" :items="[
                'Active',
                'Part-Time',
                'Remote',
                'On Leave',
                'On Probation',
                'Suspended'
            ]" v-model="employee.status" chips></v-select>
            <div v-else>Status: {{ employee.status }}</div>

            <div v-if="editMode">Address:
                <v-text-field label="Street" v-model="employee.address.street"></v-text-field>
                <v-text-field label="House Number" v-model="employee.address.houseNumber"></v-text-field>
                <v-text-field label="Zip Code" v-model="employee.address.zipCode"></v-text-field>
                <v-text-field label="City" v-model="employee.address.city"></v-text-field>
            </div>
            <div v-else>Address:
                <div>Street {{ employee.address.street }}</div>
                <div>House Number {{ employee.address.houseNumber }}</div>
                <div>Zip Code {{ employee.address.zipCode }}</div>
                <div>City {{ employee.address.city }}</div>
            </div>


        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="toggleEditMode">{{ editMode ? 'Save' : 'Edit' }} Employee</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';

export default defineComponent({
    name: 'EmployeePublicProfile',
    props: {
        employee: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const editableEmployee = reactive({ ...props.employee });
        const editMode = ref(false);
        function toggleEditMode() {
            editMode.value = !editMode.value;
        }

        return { ...toRefs(editableEmployee), editMode, toggleEditMode };
    }
});
</script>

<style scoped>
.v-card {
    margin: 10px;
}
</style>