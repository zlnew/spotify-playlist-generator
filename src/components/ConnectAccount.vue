<script setup lang="ts">
import { authorizeAccount } from '@/services/spotifyService';
import VButton from './Button.vue';

function connectToSpotify() {
  authorizeAccount();
}
</script>

<template>
    <div class="mb-8 md:mb-16 animate-fade-in flex justify-center items-center">
        <h1 class="text-3xl text-white mb-4 md:text-4xl">Before we start, please connect to your <span class="font-bold text-primary">Spotify Account</span></h1>
    </div>

    <div class="mb-8 animate-fade-in flex justify-center items-center">
        <v-button @click="connectToSpotify" variant="primary" size="xlarge" slotted>
            <v-icon icon="fa-brands fa-spotify" size="lg" class="mr-2" />Connect spotify account
        </v-button>
    </div>
</template>