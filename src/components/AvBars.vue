<script setup lang="ts">
import { useAudioStore } from '@/stores/audio';
import { updateUI_onAudioStop } from '@/services/audioService';
import FFT from 'fft.js';
import { onMounted, ref } from 'vue';

defineOptions({
  inheritAttrs: false
});

const audioStore = useAudioStore();

const canvas = ref<HTMLCanvasElement | null>(null);
const audio = ref<HTMLAudioElement | null>(null);
const fft = ref<FFT | null>(null);
const sourceNode = ref<MediaElementAudioSourceNode | null>(null);
const analyserNode = ref<AnalyserNode | null>(null);

const setupCanvas = (): void => {
  const canvasElement = canvas.value!;
  const canvasContext = canvasElement.getContext('2d')!;
  const devicePixelRatio = window.devicePixelRatio || 1;

  const resizeCanvas = (): void => {
    const { width, height } = canvasElement.getBoundingClientRect();
    canvasElement.width = width * devicePixelRatio;
    canvasElement.height = height * devicePixelRatio;
    canvasContext.scale(devicePixelRatio, devicePixelRatio);
  };

  const drawSpectrum = (): void => {
    const dataArray = new Uint8Array(analyserNode.value!.frequencyBinCount);
    analyserNode.value!.getByteFrequencyData(dataArray);

    const width = canvasElement.width;
    const height = canvasElement.height;
    const barWidth = (width / dataArray.length) * 2.5;
    const canvasContext = canvasElement.getContext('2d')!;
    canvasContext.clearRect(0, 0, width, height);

    let x = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const value = dataArray[i];
      const barHeight = value / 2;
      canvasContext.fillStyle = 'hsl(160, 100%, 37%)';
      canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight);
      x += barWidth + 1;
    }

    requestAnimationFrame(drawSpectrum);
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawSpectrum();
};

const createSourceNode = (): void => {
  const audioElement = audio.value!;
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  if (!sourceNode.value) {
    sourceNode.value = audioContext.createMediaElementSource(audioElement);
    analyserNode.value = audioContext.createAnalyser();
    analyserNode.value.fftSize = 2048;

    sourceNode.value.connect(analyserNode.value);
    analyserNode.value.connect(audioContext.destination);

    const fftObject = new FFT(analyserNode.value.fftSize);

    audioElement.addEventListener('ended', () => {
      updateUI_onAudioStop(audioStore.track.id);
    });

    fft.value = fftObject;
  }

  setupCanvas();
};

const playAudio = async (): Promise<void> => {
  const audioElement = audio.value!;
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  if (audioElement.paused) {
    createSourceNode();
    await audioElement.play();
  }
  
  else {
    audioElement.pause();
    audioContext.suspend();
  }
};

const mutateAudioVolume = (mutation: any, state: any) => {
  audio.value!.volume = state.state.volume;
}

const mutateAudioPause = () => {
  audio.value!.pause();
}

const mutateAudioPlay = (mutation: any) => {
  if (mutation.events.oldValue === 'paused') {
    audio.value!.play();
  }
  else if (mutation.events.oldValue === 'suspended') {
    audio.value!.addEventListener('canplaythrough', function() {
      audio.value!.play();
    });
  }
}

onMounted(() => {
  audioStore.$subscribe((mutation: any, state) => {
    if (mutation.events!.key === 'volume') {
      mutateAudioVolume(mutation, state);
    }
    
    if (mutation.events.newValue === 'paused') {
      mutateAudioPause();
    }
    else if (mutation.events.newValue === 'playing') {
      mutateAudioPlay(mutation);
    }
  });

  playAudio();
});
</script>

<template>
  <audio
    ref="audio"
    crossorigin="anonymous"
    :src="audioStore.track.url"
    :volume="audioStore.state.volume"
  ></audio>

  <canvas
    ref="canvas"
    class="w-full"
  ></canvas>
</template>