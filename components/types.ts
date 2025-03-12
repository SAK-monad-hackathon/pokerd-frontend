import { Card } from "@mui/material";

export interface CardType {
  rank: string;
  suit: string;
  color: string;
}

export interface Player {
  address: String;
  stack: String;
  bet: String;
  cards: CardType[] | null;
  isYourTurn: Boolean;
  position: Number;
}
