<template>
  <v-container>
    <h1>hallo Emploey Page</h1>
    <EmployeeList/>
  </v-container>
</template>

<script>
import EmployeeList from '@/components/EmployeeList.vue';
export default {
  name: 'Employees',
  components:{
    EmployeeList
  }
}
</script>

<style scoped>

</style>

