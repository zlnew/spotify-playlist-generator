<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        type?: 'button' | 'submit' | 'reset';
        variant?: 'primary' | 'secondary' | 'tertiary';
        size?: 'small' | 'medium' | 'large' | 'xlarge';
        disabled?: boolean;
        slotted?: boolean;
        text?: string;
    }>(), {
        type: 'button',
        variant: 'primary',
        size: 'medium',
        disabled: false,
        slotted: false,
        text: '',
    }
);

const className = computed(() => {
    const globalClass = 'px-6 py-3 font-bold rounded-full transition ease-in-out';

    const hoverClass = {
        primary: 'hover:outline hover:outline-offset-4 hover:outline-primary/50 hover:opacity-90 hover:animate-shadow-glow',
        secondary: 'hover:outline hover:outline-offset-4 hover:outline-primary/50 hover:opacity-90 hover:animate-shadow-glow hover:bg-primary hover:text-white',
        tertiary: 'hover:underline hover:opacity-90',
    }

    const focusClass = {
        primary: 'focus:outline focus:outline-offset-4 focus:outline-primary/50 focus:bg-primary focus:text-white focus:animate-shadow-glow',
        secondary: 'focus:outline focus:outline-offset-4 focus:outline-primary/50 focus:bg-primary focus:text-white focus:animate-shadow-glow',
        tertiary: 'focus:outline focus:outline-offset-4 focus:outline-primary/50 focus:bg-primary/25',
    };

    const disabledClass = props.disabled ? 'disabled:opacity-70' : '';

    const variantClass = {
        primary: 'bg-primary text-white',
        secondary: 'bg-transparent text-primary border-2 border-primary',
        tertiary: 'bg-transparent text-white-mute',
    }

    const sizeClass = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
        xlarge: 'text-xl',
    }

    return `${globalClass} ` +
        `${hoverClass[props.variant]} ` +
        `${focusClass[props.variant]} ` +
        `${disabledClass} ` +
        `${variantClass[props.variant]} ` +
        `${sizeClass[props.size]} `;
});
</script>

<template>
    <button v-bind="{
        type: type,
        disabled: disabled,
        class: className,
    }">
        <template v-if="slotted"><slot></slot></template>
        <template v-else>{{ text }}</template>
    </button>
</template>