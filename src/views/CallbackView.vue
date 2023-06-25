<script setup lang="ts">
import { nextTick, onMounted } from 'vue';
import { getAccessToken, getUserProfile } from '@/services/spotifyService';
import { useSpotifyStore } from '@/stores/spotify';

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const spotify = useSpotifyStore();

onMounted(async () => {
  if (code) {
    await getAccessToken(code).then((accessToken) => {
      spotify.connect(accessToken);
    });

    await getUserProfile(spotify.getAccessToken).then((userProfile) => {
      spotify.user(userProfile);
    });

    await nextTick();
    window.location.href = '/get-started';
  }
});
</script>

<template>
  <Suspense>
    <template #default>
      <main>
          <div class="flex justify-center items-center">
              <h1 class="text-4xl text-white mb-4">Connecting your account..</h1>
          </div>
      </main>
    </template>
    <template #fallback>
      <main>
          <div class="flex justify-center items-center">
              <h1 class="text-4xl text-white mb-4">Connecting your account..</h1>
          </div>
      </main>
    </template>
  </Suspense>
</template>