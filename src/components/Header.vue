<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { authorizeAccount } from '@/services/spotifyService';
import VButton from '@/components/Button.vue';
import { useSpotifyStore } from '@/stores/spotify';

const spotify = useSpotifyStore();
const userProfile: any = spotify.getUserProfile;

function connectToSpotify() {
  authorizeAccount();
}

function disconnectFromSpotify() {
  spotify.disconnect();
  window.location.href = '/';
}
</script>

<template>
  <div class="absolute top-10 right-0 left-0 w-full">
    <nav class="px-8 md:px-16 flex justify-between items-start">
      <router-link to="/">
        <h5 class="font-bold text-3xl text-primary">Vibes In</h5> <span class="text-xs md:text-base">Powered by Spotify Web API</span>
      </router-link>

      <template v-if="spotify.getAuth.accessToken">
        <div class="hidden md:block flex justify-between space-x-4">
          <v-button variant="tertiary" :text="`Logged in as ${userProfile.display_name}`" />
          <v-button @click="disconnectFromSpotify" variant="secondary" text="Disconnect from spotify" />
        </div>
  
        <div class="md:hidden">
          <v-button @click="disconnectFromSpotify" variant="tertiary" text="Logout" />
        </div>
      </template>

      <v-button class="hidden md:block" v-else @click="connectToSpotify" variant="secondary" slotted>
        <v-icon icon="fa-brands fa-spotify" size="lg" class="mr-2" />Connect to spotify
      </v-button>
    </nav>
  </div>
</template>