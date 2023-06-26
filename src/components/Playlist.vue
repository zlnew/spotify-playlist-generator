<script setup lang="ts">
import { useSpotifyStore } from '@/stores/spotify';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import VButton from '@/components/Button.vue';

const router = useRouter();

const playlistUrl = computed(() => {
  const playlistId = useSpotifyStore().spotify.playlist;
  return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`
});

function generateAgain() {
  useSpotifyStore().spotify.playlist = '';
  router.push({ name: 'get-started' });
}
</script>

<template>
  <div class="animate-fade-in mb-6 flex justify-center space-y-4">
    <h1 class="text-2xl text-white mb-4 md:text-4xl">Congrats!, you have created a new playlist. Enjoy it!</h1>
  </div>

  <div class="animate-fade-in mb-6 flex justify-center space-y-4">
    <iframe style="border-radius:12px" :src="playlistUrl" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  </div>

  <div class="animate-fade-in text-right">
    <v-button @click="generateAgain" variant="secondary" slotted>
      <v-icon icon="fa-solid fa-rotate" size="lg" class="mr-2" />Generate Again
    </v-button>
  </div>
</template>