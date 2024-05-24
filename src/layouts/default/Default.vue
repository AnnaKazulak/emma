<script setup>
import { ref } from "vue";
const drawer = ref(false);
</script>


<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <router-link to="/" class="logo-link">
        <img src="src/assets/emma-logo-removebg-2.png" alt="Emma logo" class="logo-image" />
      </router-link>
      <template #append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar v-bind="props" size="50" color="blue">
              <span>DK</span>
            </v-avatar>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in ['Profile', 'Settings', 'Logout']" :key="index" :value="index">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-navigation-drawer expand-on-hover rail v-model="drawer">
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-account" title="Employees" :to="`/employees`"></v-list-item>
        <v-list-item prepend-icon="mdi-comment-outline" title="Comments" :to="`/comments`"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ml-3" style="min-height: 300px">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<style scoped>
.toolbar-logo {
  flex-grow: 0;
  /* Prevent the title from taking too much space */
}

.logo-link {
  display: flex;
  /* Ensures the link and image are aligned properly */
  align-items: center;
  /* Vertically aligns the logo */
}

.logo-image {
  height: 200px;
  /* Adjust size as needed */
  width: auto;
  /* Maintain aspect ratio */
}

img.logo-image {
  margin-bottom: 10px;
}
</style>