<script setup lang="ts">
import { useScrollTop } from '@/composables/scrollTop';

useScrollTop();
</script>

<template>
  <v-empty-state
    headline="Whoops, 404"
    title="Page not found"
    text="The page you were looking for does not exist"
    image="/src/assets/logo.png"
  ></v-empty-state>
</template>

<style scoped></style>
