<script setup lang="ts">
import { RouterLink } from "vue-router";
import VButton from '@/components/Button.vue';
import { useSpotifyStore } from '@/stores/spotify';
import { ref, onBeforeUnmount } from 'vue';
import { toggleAudioPlay, setAudioVolume } from '@/services/audioService';
import { addItemsToPlaylist, createPlaylist } from '@/services/spotifyService';
import { useAudioStore } from "@/stores/audio";

const spotify = useSpotifyStore();
const tracks: any = spotify.getRecommendations.tracks;
const volume = ref(0.5);

async function saveItemsToPlaylist() {
  spotify.loading(true);

  const userProfile: any = spotify.getUserProfile;
  const userId = userProfile.id;

  const playlist: any = await creatingPlaylist(userId);
  spotify.playlist(playlist.id);
  await addingItemsToPlaylist(playlist.id);

  spotify.loading(false);
}

async function creatingPlaylist(userId: string) {
  const playlistName = `${spotify.getVibeType?.toUpperCase()} Vibes by Vibes In`;
  const createPlaylistData = {
    name: playlistName,
    public: true,
  };

  return await createPlaylist(userId, createPlaylistData);
}

async function addingItemsToPlaylist(playlistId: string) {
  const addItemsToPlaylistData = {
    uris: tracks.map((track: any) => track.uri),
  }

  await addItemsToPlaylist(playlistId, addItemsToPlaylistData);
}

onBeforeUnmount(() => {
  useAudioStore().toggleState('suspended');
});
</script>

<template>
  <div class="animate-fade-in mb-6 md:flex justify-center space-y-4">
    <h1 class="text-lg text-white mb-4 md:text-4xl">Here are our recommendations for your chosen  {{ spotify.getVibeType }} vibes.</h1>
  </div>

  <div class="mb-4 animate-fade-in space-y-4 md:px-0">
    <table class="w-full text-left">
      <thead class="border-b border-primary">
        <tr class="text-primary">
          <th class="p-1">Total: {{ tracks.length }} tracks</th>
        </tr>
      </thead>
    </table>
  </div>

  <div class="mb-12 tracks max-h-[25vh] animate-fade-in space-y-4 md:max-h-[25vw]">
    <table class="w-full text-left">
      <tbody>
        <tr v-for="track in tracks" :id="`track${track.id}`" class="transition ease-in-out rounded hover:bg-primary/10">
          <td class="p-1 pl-3">
            <template v-if="track.preview_url">
              <v-icon
                @click="toggleAudioPlay({
                  id: track.id,
                  url: track.preview_url
                })"
                :id="`play${track.id}`"
                icon="fa-solid fa-play"
                class="block"
              />

              <v-icon
                @click="toggleAudioPlay({
                  id: track.id,
                  url: track.preview_url
                })"
                :id="`pause${track.id}`"
                icon="fa-solid fa-pause"
                class="hidden text-primary"
              />
            </template>
          </td>
          
          <td class="p-1">
            <div class="flex justify-start space-x-4">
              <img class="max-h-10 md:max-h-auto" :src="track.album.images[2].url">
              <div>
                <h5 class="text-sm font-bold md:text-lg">
                  <a :href="track.external_urls.spotify" :id="`title${track.id}`">
                    {{ track.name }}
                  </a>
                </h5>

                <div class="text-sm flex space-x-2 md:text-lg">
                  <span v-for="(artist, index) in track.artists" :key="artist.id">
                    {{ artist.name }}
                    <span v-if="index !== track.artists.length - 1">, </span>
                  </span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="md:flex flex-row justify-between items-center">
    <div class="md:flex space-x-2">
      <v-icon icon="fa-solid fa-volume-high" />
      <input @input="setAudioVolume(volume);" type="range" v-model="volume" min="0" max="1" step="0.01" class="volume-slider" />
    </div>

    <div class="md:flex md:justify-end md:space-x-4">
      <div class="my-4 md:my-0">
        <v-button class="w-full" @click="saveItemsToPlaylist()" variant="primary" slotted>
          <v-icon icon="fa-brands fa-spotify" size="lg" class="mr-2" />Save tracks to a new playlist
        </v-button>
      </div>

      <router-link to="get-started">
        <v-button class="w-full" variant="secondary" slotted>
          <v-icon icon="fa-solid fa-rotate" size="lg" class="mr-2" />Generate Again
        </v-button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.tracks {
  overflow-y: auto;
}

/* Webkit based browsers */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background-color: var(--color-black);
}

::-webkit-scrollbar-thumb {
  background-color: hsl(var(--color-primary) / 1);
  border-radius: 6px;
}

.volume-slider {
  accent-color: hsl(var(--color-primary) / 1);
}
</style>