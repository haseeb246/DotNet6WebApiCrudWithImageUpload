import { GameCharacter } from "./gameCharacter";

export class Game {
  id: number;
  title: string;
  platform: string;
  releaseYear: string;
  image: string;
  gameCharacter: GameCharacter[] = [];

  file?: any;
}
