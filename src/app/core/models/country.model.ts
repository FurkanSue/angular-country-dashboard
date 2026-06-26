export interface Country {
  code: string;
  name: string;
  continent: {
    name: string;
  };
  capital?: string;
  emoji: string;
  population?: number;
}