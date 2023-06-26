<script setup lang="ts">
import { useSpotifyStore } from '@/stores/spotify';
import TracksPreview from '@/components/TracksPreview.vue';
import Playlist from '@/components/Playlist.vue';
import VLoading from '@/components/Loading.vue';
import { computed } from 'vue';

const spotify = useSpotifyStore();

const component = computed(() => {  
  if (Object.keys(spotify.getPlaylist).length) return Playlist;
  return TracksPreview;
});
</script>

<template>
  <main>
    <v-loading v-if="spotify.isLoading" text="Creating a playlist.." />
    <component v-else :is="component" />
  </main>
</template>