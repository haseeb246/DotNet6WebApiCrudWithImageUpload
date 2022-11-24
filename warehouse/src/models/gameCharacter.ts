import { Game } from "./game";
export class GameCharacter {
  id: number;
  gameId: number;
  name: string;
  image: string;
  game: Game;
  file?: any;
}
