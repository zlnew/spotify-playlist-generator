<script setup lang="ts">
import { useAudioStore } from '@/stores/audio';
import AvBars from '@/components/AvBars.vue';

const audioStore = useAudioStore();
</script>

<template>
  <div
    v-if="audioStore.state.name === 'playing' || audioStore.state.name === 'paused'"
    class="av-bar-container z-[-1] transition-all ease-in-out">
    <av-bars v-bind="audioStore.track" />
  </div>
</template>