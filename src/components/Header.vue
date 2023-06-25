<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { authorizeAccount } from '@/services/spotifyService';
import VButton from '@/components/Button.vue';
import { useSpotifyStore } from '@/stores/spotify';
import { reactive } from 'vue';

const spotify = useSpotifyStore();
const userProfile = reactive<any>(spotify.getUserProfile);

function connectToSpotify() {
  authorizeAccount();
}

function disconnectFromSpotify() {
  spotify.disconnect()
  window.location.href = '/';
}
</script>

<template>
  <div class="absolute top-10 right-0 left-0 w-full">
    <nav class="px-8 md:px-16 flex justify-between items-start">
      <router-link to="/">
        <h5 class="font-bold text-3xl text-primary mb-4">Vibes In</h5>
      </router-link>
      <div v-if="spotify.getAccessToken && spotify.getAccessToken !== 'noauth'" class="flex justify-between space-x-4">
        <v-button variant="tertiary" :text="`Logged in as ${userProfile.display_name}`" />
        <v-button @click="disconnectFromSpotify" variant="secondary" text="Disconnect from spotify" />
      </div>
      <v-button v-else @click="connectToSpotify" variant="secondary" slotted>
        <v-icon icon="fa-brands fa-spotify" size="lg" class="mr-2" />Connect to spotify
      </v-button>
    </nav>
  </div>
</template>