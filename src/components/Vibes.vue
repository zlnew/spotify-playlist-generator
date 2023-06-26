<script setup lang="ts">
import { getUserTopItems, getRecommendations } from '@/services/spotifyService';
import { vibeGenres, getRandomGenres, type IVibe } from '@/services/vibesService';
import { useSpotifyStore } from '@/stores/spotify';

const spotify = useSpotifyStore();

async function getSeeds(vibeType: IVibe['type']) {
  const top_artists: any = await getUserTopItems({ type: 'artists', limit: 1 });
  const top_tracks: any = await getUserTopItems({ type: 'tracks', limit: 1 });

  const seed_genres = getRandomGenres(vibeType, 3);
  const seed_artists = top_artists.items.map((artist: any) => artist.id);
  const seed_tracks = top_tracks.items.map((track: any) => track.id);

  return { seed_artists, seed_tracks, seed_genres };
}

async function seedingRecommendations(
  seeds: {
    seed_artists: string[],
    seed_genres: string[]
    seed_tracks: string[],
  })
{
  const joinedSeeds = {
    seed_artists: seeds.seed_artists.join(', '),
    seed_genres: seeds.seed_genres.join(', '),
    seed_tracks: seeds.seed_tracks.join(', '),
  }

  return await getRecommendations(joinedSeeds);
}

async function generateRecommendations(vibeType: IVibe['type']) {
  spotify.loading(true);

  const seeds = await getSeeds(vibeType);
  const tracks = await seedingRecommendations(seeds);

  spotify.recommendations({ seeds, tracks });
  spotify.vibeType(vibeType);
  spotify.loading(false);
}
</script>

<template>
    <div class="mb-16 animate-fade-in flex justify-center items-center">
        <h1 class="text-4xl text-white mb-4">What <span class="transition ease-in-out vibe-question font-bold text-primary">vibe</span> you're feeling right now</h1>
    </div>

    <div class="animate-fade-in flex justify-center items-center space-x-8">
        <div
          v-for="(_value, vibe) in vibeGenres"
          @click="generateRecommendations(vibe)"
          class="vibe px-5 py-3 transition ease-in-out text-3xl border-b-4 border-black hover:border-white hover:scale-125"
          >{{ vibe }}
        </div>
    </div>
</template>

<style scoped>
.vibe {
    cursor: pointer;
    font-weight: bold;
    text-transform: capitalize;
}
</style>