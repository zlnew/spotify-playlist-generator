<script setup lang="ts">
import { useAudioStore } from '@/stores/audio';
import AvBars from '@/components/AVBars.vue';

const audioStore = useAudioStore();
</script>

<template>
  <div v-if="audioStore.state.isPlaying" class="equalizer-container z-[-1]">
    <av-bars v-bind="audioStore.state" />
  </div>
</template>