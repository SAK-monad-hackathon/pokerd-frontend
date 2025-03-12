export const getValueRank = (value: string | undefined) => {
  switch (value) {
    case "Ace":
      return "A";
    case "Jack":
      return "J";
    case "Queen":
      return "Q";
    case "King":
      return "K";
    case "Two":
      return "2";
    case "Three":
      return "3";
    case "Four":
      return "4";
    case "Five":
      return "5";
    case "Six":
      return "6";
    case "Seven":
      return "7";
    case "Eight":
      return "8";
    case "Nine":
      return "9";
    case "Ten":
      return "10";
    default:
      return value;
  }
};

export const getSuitSymbol = (suit: string | undefined) => {
  switch (suit) {
    case "Spade":
      return "♠";
    case "Club":
      return "♣";
    case "Diamond":
      return "♦";
    case "Heart":
      return "♥";
    default:
      return "";
  }
};

export const getCardColor = (suit: string | undefined) => {
  switch (suit) {
    case "Spade":
    case "Club":
      return "text-black";
    case "Diamond":
    case "Heart":
      return "text-red-600";
    default:
      return "";
  }
};
