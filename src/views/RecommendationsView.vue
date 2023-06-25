<script setup lang="ts">
import { RouterLink } from "vue-router";
import VButton from '@/components/Button.vue';
import { useSpotifyStore } from '@/stores/spotify';
import { ref, reactive, onBeforeUnmount } from 'vue';
import { toggleAudioPlay, setAudioVolume } from '@/services/audioService';
import { addItemsToPlaylist, createPlaylist } from '@/services/spotifyService';
import { useAudioStore } from "@/stores/audio";

const spotify = useSpotifyStore();
const tracks: any = reactive(spotify.getRecommendations.tracks);
const volume = ref(0.5);

async function saveItemsToPlaylist() {
  const accessToken = spotify.getAccessToken;
  const userProfile: any = spotify.getUserProfile;
  const userId = userProfile.id;

  const playlist: any = await creatingPlaylist(accessToken, userId);
  await addingItemsToPlaylist(accessToken, playlist.id);
}

async function creatingPlaylist(accessToken: string, userId: string) {
  const createPlaylistData = {
    name: 'Vibes In Playlist',
    public: true,
  };

  return await createPlaylist(accessToken, userId, createPlaylistData);
}

async function addingItemsToPlaylist(accessToken: string, playlistId: string) {
  const addItemsToPlaylistData = {
    uris: tracks.map((track: any) => track.uri),
  }

  await addItemsToPlaylist(accessToken, playlistId, addItemsToPlaylistData).then((res: any) => {
    spotify.playlist(res);
  });
}

onBeforeUnmount(() => {
  useAudioStore().toggleState('suspended');
});
</script>

<template>
  <main>
    <div class="animate-fade-in mb-6 flex justify-center space-y-4">
      <h1 class="text-4xl text-white mb-4">Here are our recommendations for your chosen  {{ spotify.getVibeType }} vibes.</h1>
    </div>

    <div class="mb-4 animate-fade-in space-y-4">
      <table class="w-full text-left">
        <thead class="border-b border-primary">
          <tr class="text-primary">
            <th class="p-1">#</th>
            <th class="p-1">Title</th>
          </tr>
        </thead>
      </table>
    </div>

    <div class="mb-12 tracks animate-fade-in space-y-4">
      <table class="w-full text-left">
        <tbody>
          <tr v-for="(track, number) in tracks" :id="`track${track.id}`" class="transition ease-in-out rounded hover:bg-primary/10">
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
                <img :src="track.album.images[2].url" alt="">
                <div>
                  <h5 class="text-lg font-bold">
                    <a :href="track.external_urls.spotify" :id="`title${track.id}`">
                      {{ track.name }}
                    </a>
                  </h5>
  
                  <div class="artists flex space-x-2">
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

    <div class="flex justify-between items-center">
      <div class="flex space-x-2">
        <v-icon icon="fa-solid fa-volume-high" />
        <input @input="setAudioVolume(volume);" type="range" v-model="volume" min="0" max="1" step="0.01" class="volume-slider" />
      </div>

      <div class="flex justify-end space-x-4">
        <v-button @click="saveItemsToPlaylist()" variant="primary" slotted>
          <v-icon icon="fa-brands fa-spotify" size="lg" class="mr-2" />Save tracks to a new playlist
        </v-button>

        <router-link to="get-started">
          <v-button variant="secondary" slotted>
            <v-icon icon="fa-solid fa-rotate" size="lg" class="mr-2" />Generate Again
          </v-button>
        </router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.tracks {
  max-height: 40vh;
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