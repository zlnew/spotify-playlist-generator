<script setup lang="ts">
import { getUserTopItems, getRecommendations } from '@/services/spotifyService';
import { vibeGenres, getRandomGenres, type IVibe } from '@/services/vibesService';
import { useSpotifyStore } from '@/stores/spotify';
import { ref, onMounted, computed } from 'vue';
import VLoading from './Loading.vue';
import { useRouter } from 'vue-router';

const cssVariables = ref<any>();

const spotify = useSpotifyStore();

function colorizeEqualizer(bgColor: string = cssVariables.value.getPropertyValue('--color-primary / 1')) {
    const question = document.querySelector('.vibe-question') as HTMLSpanElement;
    const bars = document.querySelectorAll('.equalizer-bar');
    
    bars.forEach(bar => {
        if (bar instanceof HTMLDivElement) {
            bar.style.backgroundColor = bgColor;
        }
    });

    question.style.color = bgColor;
}

async function generateRecommendations(vibeType: IVibe['type']) {
    spotify.loading(true);

        const top_artists: any = await getUserTopItems(spotify.getAccessToken, { type: 'artists', limit: 1 });
        const top_tracks: any = await getUserTopItems(spotify.getAccessToken, { type: 'tracks', limit: 1 });

        const seed_genres = getRandomGenres(vibeType, 3);
        const seed_artists = [];
        const seed_tracks = [];    
        
        for (const artist of top_artists.items) {
            seed_artists.push(artist.id);
        }

        for (const artist of top_tracks.items) {
            seed_tracks.push(artist.id);
        }

        const tracks = await seedingRecommendations();

        spotify.recommendations({
            seed_genres: seed_genres,
            seed_artists: seed_artists,
            seed_tracks: seed_tracks,
            tracks: tracks,
        });

        spotify.vibeType(vibeType);

    spotify.loading(false);
}

async function seedingRecommendations() {
    const seeds = {
        seed_artists: spotify.getRecommendations.seed_artists.toString(),
        seed_genres: spotify.getRecommendations.seed_genres.toString(),
        seed_tracks: spotify.getRecommendations.seed_tracks.toString(),
    }
    const recommendations: any = await getRecommendations(spotify.getAccessToken, seeds);

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
        <h1 class="text-4xl text-white mb-4">Pick the <span class="transition ease-in-out vibe-question font-bold text-primary">vibe</span> you're feeling right now</h1>
    </div>

    <div class="animate-fade-in flex justify-center items-center space-x-8">
        <div v-for="(_value, vibe) in vibes"
            @click="generateRecommendations(vibe)"
            @mouseover="colorizeEqualizer(cssVariables.getPropertyValue(`--color-${vibe}`))"
            @mouseleave="colorizeEqualizer()"
            class="
                vibe px-5 py-3 transition ease-in-out text-3xl text-primary/40 border-b-4 border-black
                hover:border-white hover:scale-125"
            :class="`hover:text-${vibe}`"
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