/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      primary: 'hsl(var(--color-primary) / 1)',
      black: 'var(--color-black)',
      'black-soft': 'var(--color-black-soft)',
      'black-mute': 'var(--color-black-mute)',
      white: 'var(--color-white)',
      'white-soft': 'var(--color-white-soft)',
      'white-mute': 'var(--color-white-mute)',
      energetic: 'var(--color-energetic)',
      melancholic: 'var(--color-melancholic)',
      relaxing: 'var(--color-relaxing)',
      upbeat: 'var(--color-upbeat)',
      uplifting: 'var(--color-uplifting)',
      love: 'var(--color-love)',
      thoughtful: 'var(--color-thoughtful)',
    },
    animation: {
      'fade-in': 'fade-in 1s ease-in forwards',
      'equalizer': 'equalizer 0.5s ease-in-out infinite',
      'shadow-glow': 'glowing-shadow 0.5s ease-in-out forwards',
    },
    keyframes: {
      'fade-in': {
        '0%': {
          opacity: '0%',
        },
        '100%': {
          opacity: '100%',
        },
      },
      'equalizer': {
        '0%, 100%': {
          boxShadow: '0 0 0 0 hsl(var(--color-primary) / 0)',
        },
        '50%': {
          boxShadow: '0 0 25px 1px hsl(var(--color-primary) / 0.5)',
        },
      },
      'glowing-shadow': {
        '0%': {
          boxShadow: '0 0 0 0 hsl(var(--color-primary) / 0)',
        },
        '100%': {
          boxShadow: '0 0 25px 1px hsl(var(--color-primary) / 0.5)',
        },
      },
    }
  },
  plugins: [],
}