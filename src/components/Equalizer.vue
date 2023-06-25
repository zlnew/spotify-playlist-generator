<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    setInterval(animateEqualizer, 200);
});

function getRandomHeight() {
    return Math.floor(Math.random() * 75) + 0;
}

function getRandomOpacity() {
    return Math.floor(Math.random() * 50) + 0;
}

function animateEqualizer() {
    const bars = document.querySelectorAll('.equalizer-bar');
    bars.forEach(bar => {
        if (bar instanceof HTMLDivElement) {
            const height = getRandomHeight();
            const opacity = getRandomOpacity();
            bar.style.height = `${height}px`;
            bar.style.opacity = `${opacity}%`;
        }
    });
}
</script>

<template>
    <div class="equalizer-container">
        <div v-for="index in 100" :key="index" class="transition-all bg-primary opacity-0 equalizer-bar mx-1"></div>
    </div>
</template>