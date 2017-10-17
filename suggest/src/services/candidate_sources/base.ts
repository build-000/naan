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
  AMAZING = "amazing",
  SICK = "sick",
  DISGUSTING = "disgusting",
  LOVELY = "lovely",
  SLEEPY = "sleepy",
}

export enum BOT {
  STEPHANIE = "stephanie",
  RUUCM = "ruucm",
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
