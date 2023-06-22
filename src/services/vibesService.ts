export interface IVibe {
  type: 'energetic' |'melancholic' |'relaxing' | 'upbeat' | 'uplifting' | 'love' | 'thoughtful';
}

export const vibeGenres: Record<IVibe['type'], { genres: string[] }> = {
  energetic: {
    genres: ['pop', 'dance', 'electronic', 'funk', 'r&b'],
  },
  melancholic: {
    genres: ['ballads', 'indie', 'acoustic', 'folk', 'soul'],
  },
  relaxing: {
    genres: ['ambient', 'chillout', 'downtempo', 'jazz', 'lo-fi'],
  },
  upbeat: {
    genres: ['hip-hop', 'rap', 'edm', 'rock', 'pop'],
  },
  uplifting: {
    genres: ['pop-rock', 'alternative', 'inspirational', 'electronic', 'indie'],
  },
  love: {
    genres: ['r&b', 'pop', 'ballads', 'indie', 'romantic-classics'],
  },
  thoughtful: {
    genres: ['indie', 'folk', 'alternative', 'ambient', 'classical'],
  }
}

export function getRandomGenres(vibeType: IVibe['type'], count: number): string[] {
  const vibe = vibeGenres[vibeType];

  if (!vibe) {
    throw new Error(`Invalid vibe type: ${vibeType}`);
  }

  const allGenres = vibe.genres;
  const selectedGenres: string[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * allGenres.length);
    const randomGenre = allGenres[randomIndex];
    selectedGenres.push(randomGenre);
    allGenres.splice(randomIndex, 1);
  }

  return selectedGenres;
}