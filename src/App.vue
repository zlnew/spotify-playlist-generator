<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import VEqualizer from '@/components/Equalizer.vue';
</script>

<template>
  <Header />
  <RouterView />
  <VEqualizer />
</template>