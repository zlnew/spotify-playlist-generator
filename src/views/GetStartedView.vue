<script setup lang="ts">
import ConnectAccount from '@/components/ConnectAccount.vue';
import VLoading from '@/components/Loading.vue';
import Vibes from '@/components/Vibes.vue';
import { useSpotifyStore } from '@/stores/spotify';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const spotify = useSpotifyStore();

spotify.$subscribe((_mutation, state) => {
    if (!state.spotify.isLoading) {
        router.push({ name: 'recommendations' });
    }
});

const component = computed(() => {
    if (spotify.getAccessToken)
        return Vibes;
    
    return ConnectAccount;
});
</script>

<template>
    <main>
        <v-loading v-if="spotify.isLoading" text="Generating playlist for you.." />
        <component v-else :is="component" />
    </main>
</template>