<script setup lang="ts">
import { RouterLink } from "vue-router";
import VButton from "@/components/Button.vue";
</script>

<template>
  <main>
    <div class="animate-fade-in mb-6 flex justify-center space-y-4">
      <h1 class="text-3xl text-center text-white mb-4 md:text-4xl">Elevate your spotify playlist with <b class="text-primary">Vibes In.</b></h1>
    </div>
    <div class="animate-fade-in flex justify-center items-center space-x-4">
      <router-link to="get-started">
        <v-button variant="primary" size="xlarge" slotted>
          <v-icon icon="fa-solid fa-play" size="lg" class="mr-2" />Let's Start
        </v-button>
      </router-link>
    </div>
  </main>
</template>
