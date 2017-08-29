export enum WEATHER {
  WARM = "warm",
  COOL = "cool",
  RAINY = "rainy",
  SNOWY = "snowy",
}

export enum MOOD {
  ANGRY = "angry",
  HAPPY = "happy",
  SAD = "sad",
  RELAXED = "relaxed",
}

export interface DataSource<T> {
  fetch(count?: number): Promise<T[]>;
}

export interface CandidateItem {
  id: number;
  score: number;
  metadata: {
    source: string;
    trackId?: number;
  };
  track: any;
}
