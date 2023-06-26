<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
    <div class="mb-16 animate-fade-in flex justify-center items-center">
        <h1 class="text-4xl text-white mb-4">{{ text }}</h1>
    </div>
</template>