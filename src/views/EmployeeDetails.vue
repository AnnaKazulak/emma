<template>
    <v-container fluid>
        <v-card v-if="employee" class="pa-4 ma-0 elevation-0" flat>
            <v-row align="center" class="pt-3"> <!-- Added padding to the top -->
                <v-col cols="auto">
                    <v-avatar color="grey lighten-4" size="56">
                        <v-icon size="36">mdi-account</v-icon>
                        <!-- Optional: replace with an actual avatar if available -->
                    </v-avatar>
                </v-col>
                <v-col>
                    <div class="text-h5 font-weight-bold" style="font-size: 1.25rem;">
                        <!-- Increased size and made bold -->
                        {{ employee.firstName }} {{ employee.lastName }}
                        <v-chip :color="employee.status === 'Suspended' ? 'red' : 'green'" text-color="white"
                            class="ml-2">
                            {{ employee.status }}
                        </v-chip>
                    </div>
                    <div class="caption">
                        {{ employee.position }} · {{ employee.department }}
                    </div>
                    <div class="caption grey--text">
                        Since {{ employee.startDate }}
                    </div>
                </v-col>
            </v-row>
        </v-card>
        <div v-else class="text-center">
            Employee details not found.
        </div>
    </v-container>
</template>






<script setup>
import { inject, computed } from 'vue';
import { useRoute } from 'vue-router';

const employees = inject('employeesKey');
const route = useRoute();
const employeeId = route.params.id;

const employee = computed(() => {
    return employees.value.find(emp => emp.id === parseInt(employeeId));
});

</script>


<style scoped>
.v-container {
    max-width: 100%;
    padding: 0;
    /* Remove padding if not needed elsewhere */
}

.v-card {
    width: 100%;
    /* Ensure card takes full width */
    border: none;
    /* No borders */
    padding-top: 20px;
    /* Added padding to the top of the card */
}

.text-h5 {
    font-weight: bold;
    /* Make font bold */
    font-size: 24px;
    /* Increase font size */
    line-height: 1.4;
    /* Adjust line height for better readability */
}

.caption {
    color: #757575;
    /* Adjust color for less emphasis */
}

.v-chip {
    transform: translateY(-20%);
    /* Adjust vertical position slightly if needed */
}
</style>
