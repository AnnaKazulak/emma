<template>
    <v-card v-if="employee" class="pa-4 ma-0 elevation-0" flat>
        <v-row align="center" class="pt-3">
            <v-col cols="auto">
                <v-avatar color="grey lighten-4" size="56">
                    <v-icon size="36">mdi-account</v-icon>
                </v-avatar>
            </v-col>
            <v-col>
                <div class="text-h5 font-weight-bold">
                    {{ employee.firstName }} {{ employee.lastName }}
                    <v-chip :color="employee.status === 'Suspended' ? 'red' : 'green'" text-color="white" class="ml-2">
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
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    employee: Object
});
</script>

<style scoped>
.v-card {
    width: 100%;
    border: none;
    padding-top: 20px;
}

.text-h5 {
    font-weight: bold;
    font-size: 24px;
    line-height: 1.4;
}

.caption {
    color: #757575;
}

.v-chip {
    transform: translateY(-20%);
}
</style>