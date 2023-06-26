<script setup lang="ts">
import { onMounted } from 'vue';
import { getAccessToken, getUserProfile } from '@/services/spotifyService';
import { useSpotifyStore } from '@/stores/spotify';

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const spotify = useSpotifyStore();

onMounted(async () => {
  if (code) {
    await getAccessToken(code).then((auth) => {
      spotify.connect(auth);
    });

    await getUserProfile().then((userProfile) => {
      spotify.user(userProfile);
    });

    window.location.href = '/get-started';
  }
});
</script>

<template>
  <Suspense>
    <template #default>
      <main>
          <div class="flex justify-center items-center">
              <h1 class="text-2xl text-white mb-4 md:text-4xl">Connecting your account..</h1>
          </div>
      </main>
    </template>
    <template #fallback>
      <main>
          <div class="flex justify-center items-center">
              <h1 class="text-2xl text-white mb-4 md:text-4xl">Connecting your account..</h1>
          </div>
      </main>
    </template>
  </Suspense>
</template>