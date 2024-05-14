<template>
    <div v-show="$parent.activeTab === name">
      <slot></slot>
    </div>
  </template>
  
  <script>
  import { defineComponent, inject } from 'vue';
  
  export default defineComponent({
    name: 'Tab',
    props: ['name'],
    setup(props) {
      const activeTab = inject('activeTab');
  
      return { activeTab };
    }
  });
  </script>
  