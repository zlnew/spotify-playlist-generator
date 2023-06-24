<script setup lang="ts">
import { RouterLink } from "vue-router";
import VButton from "@/components/Button.vue";
import { useAudioStore } from "@/stores/audio";

const audio = useAudioStore();

function toggleAudio() {
  audio.togglePlay({
    url: "https://p.scdn.co/mp3-preview/f60692bc4f4228fa7b0c68234524256cfa3566df?cid=d19eb7fdc01a478f82505e0e349f8cf0",
    isPlaying: true,
  });  
}

function toggleAudio2() {
  audio.togglePlay({
    url: "https://p.scdn.co/mp3-preview/19cde120c8321fc57dfb9bf92251e777fafd3f2c?cid=d19eb7fdc01a478f82505e0e349f8cf0",
    isPlaying: true,
  });  
}
</script>

<template>
  <main>
    <div class="animate-fade-in mb-6 flex justify-center space-y-4">
      <h1 class="text-4xl text-white mb-4">Elevate your spotify playlist with <b class="text-primary">Vibes In.</b></h1>
    </div>
    <div class="animate-fade-in flex justify-center items-center space-x-4">
      <router-link to="get-started">
        <v-button variant="primary" size="xlarge" slotted>
          <v-icon icon="fa-solid fa-play" size="lg" class="mr-2" />Get Started
        </v-button>
      </router-link>

      <v-button @click="toggleAudio" variant="primary" size="xlarge" text="Click Me!" />
      <v-button @click="toggleAudio2" variant="primary" size="xlarge" text="Click Me!" />
    </div>
  </main>
</template>
