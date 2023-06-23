import { ref, type Ref } from 'vue';

export let currentAudio: Ref<HTMLAudioElement | null> = ref(null);

export function play(audioID: string, volume: number) {
  const track = document.getElementById(`track${audioID}`) as HTMLElement;
  const titleTrack = document.getElementById(`title${audioID}`) as HTMLElement;
  const playButton = document.getElementById(`play${audioID}`) as HTMLElement;
  const pauseButton = document.getElementById(`pause${audioID}`) as HTMLElement;
  const audio = document.getElementById(audioID) as HTMLAudioElement;

  track.classList.add('bg-primary/10');
  titleTrack.classList.add('text-primary');
  playButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');

  if (currentAudio.value !== null) {
    pause(currentAudio.value.id);
  }

  audio.play();
  audio.volume = volume;
  currentAudio.value = audio;

  audio.addEventListener('ended', () => {
    track.classList.remove('bg-primary/10');
    titleTrack.classList.remove('text-primary');
    playButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
    currentAudio.value = null;
  });
}

export function pause(audioID: string) {
  const track = document.getElementById(`track${audioID}`) as HTMLElement;
  const titleTrack = document.getElementById(`title${audioID}`) as HTMLElement;
  const playButton = document.getElementById(`play${audioID}`) as HTMLElement;
  const pauseButton = document.getElementById(`pause${audioID}`) as HTMLElement;
  const audio = document.getElementById(audioID) as HTMLAudioElement;

  if (track) {
    track.classList.remove('bg-primary/10');
    titleTrack.classList.remove('text-primary');
    playButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
  
    audio.pause();
    currentAudio.value = null;
  }
}

export function setVolume(newVolume: number) {
  if (currentAudio.value !== null) {
    currentAudio.value.volume = newVolume;
  }
}