<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import AudioVisualView from '@/views/AudioVisualView.vue';
</script>

<template>
  <Header />
  <RouterView />
  <AudioVisualView />
</template>