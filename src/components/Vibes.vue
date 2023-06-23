<script setup lang="ts">
import { getUserTopItems, getRecommendations } from '@/services/spotifyService';
import { vibeGenres, getRandomGenres, type IVibe } from '@/services/vibesService';
import { useSpotifyStore } from '@/stores/spotify';
import { ref, onMounted, computed } from 'vue';

const cssVariables = ref<any>();

const spotify = useSpotifyStore();

function colorizeEqualizer(bgColor: string = cssVariables.value.getPropertyValue('--color-primary / 1'), event: EventTarget | undefined = undefined) {
    const question = document.querySelector('.vibe-question') as HTMLSpanElement;
    const vibes = document.querySelectorAll('.vibe');
    const bars = document.querySelectorAll('.equalizer-bar');
    
    question.style.color = bgColor;

    if (event) {
        event.style.color = bgColor;
    } else {
        vibes.forEach(vibe => {
            if (vibe instanceof HTMLDivElement) {
                vibe.style.color = 'white';
            }
        });
    }

    bars.forEach(bar => {
        if (bar instanceof HTMLDivElement) {
            bar.style.backgroundColor = bgColor;
        }
    });
}

async function generateRecommendations(vibeType: IVibe['type']) {
  spotify.loading(true);

  const top_artists: any = await getUserTopItems(spotify.getAccessToken, { type: 'artists', limit: 1 });
  const top_tracks: any = await getUserTopItems(spotify.getAccessToken, { type: 'tracks', limit: 1 });

  const seed_genres = getRandomGenres(vibeType, 3);
  const seed_artists = top_artists.items.map((artist: any) => artist.id);
  const seed_tracks = top_tracks.items.map((track: any) => track.id);

  const tracks = await seedingRecommendations(seed_artists, seed_tracks, seed_genres);

  spotify.recommendations({
    seed_genres,
    seed_artists,
    seed_tracks,
    tracks,
  });

  spotify.vibeType(vibeType);
        
  spotify.loading(false);
}

async function seedingRecommendations(seed_artists: string[], seed_tracks: string[], seed_genres: string[]) {
  const seeds = {
    seed_artists: seed_artists.join(','),
    seed_genres: seed_genres.join(','),
    seed_tracks: seed_tracks.join(','),
  };
  const recommendations:any = await getRecommendations(spotify.getAccessToken, seeds);

  return recommendations.tracks;
}

onMounted(() => {
    cssVariables.value = getComputedStyle(document.documentElement);
});

const vibes = computed(() => {
    return vibeGenres;
});
</script>

<template>
    <div class="mb-16 animate-fade-in flex justify-center items-center">
        <h1 class="text-4xl text-white mb-4">What <span class="transition ease-in-out vibe-question font-bold text-primary">vibe</span> you're feeling right now</h1>
    </div>

    <div class="animate-fade-in flex justify-center items-center space-x-8">
        <div v-for="(_value, vibe) in vibes"
            @click="generateRecommendations(vibe)"
            @mouseover="colorizeEqualizer(cssVariables.getPropertyValue(`--color-${vibe}`), $event.target)"
            @mouseleave="colorizeEqualizer()"
            class="vibe px-5 py-3 transition ease-in-out text-3xl border-b-4 border-black hover:border-white hover:scale-125"
        >
            {{ vibe }}
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