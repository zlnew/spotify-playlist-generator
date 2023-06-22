<script setup lang="ts">
import { loginWithSpotify } from '@/services/spotifyService';
import VButton from './Button.vue';
import { useSpotifyStore } from '@/stores/spotify';

const spotify = useSpotifyStore();

function connectToSpotify() {
  loginWithSpotify();
}

function skipForNow() {
    spotify.connect('noauth');
    window.location.href = '/get-started';
}
</script>

<template>
    <div class="mb-16 animate-fade-in flex justify-center items-center">
        <h1 class="text-4xl text-white mb-4">Before we start, please connect your <span class="font-bold text-primary">Spotify Account</span></h1>
    </div>

    <div class="mb-8 animate-fade-in flex justify-center items-center">
        <v-button @click="connectToSpotify" variant="primary" text="Connect spotify account" size="xlarge" />
    </div>

    <div class="animate-fade-in flex justify-center items-center">
        <v-button @click="skipForNow" variant="tertiary" text="Skip for now" size="large" />
    </div>
</template>