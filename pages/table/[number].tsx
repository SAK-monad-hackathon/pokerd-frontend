import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { usePrivy } from "@privy-io/react-auth";
import type React from "react";
import { useState, useEffect } from "react";
import {
  getCardColor,
  getSuitSymbol,
  getValueRank,
} from "../../components/utils";
import type { CardType, Player } from "../../components/types";
import { createPublicClient, http } from "viem";
import { monadTestnet } from "viem/chains";
import { PokerdAbi } from "../../components/contractAbi";

export const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(),
});

const PokerTable = () => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [raiseAmount, setRaiseAmount] = useState(4.0);
  const [potAmount, setPotAmount] = useState(0);
  const { logout } = usePrivy();
  const [flopCards, setFlopCards] = useState<CardType[]>([]);
  const [turnCard, setTurnCard] = useState<CardType | null>(null);
  const [riverCard, setRiverCard] = useState<CardType | null>(null);
  const [players, setPlayers] = useState<Player[] | null>(null);
  players;

  publicClient.watchContractEvent({
    address: "0x30A62f3F83e410D2c4b2C58c0F820822E9351e2c",
    abi: PokerdAbi,
    eventName: "PlayerJoined",
    onLogs: (logs) => setPlayer(logs),
  });

  const setPlayer = (logs: any) => {
    const newPlayer: Player = {
      address: logs[0].args.player,
      stack: `$0.00`,
      bet: "$0.00",
      cards: null,
      position: logs[0].args.indexOnTable,
      isYourTurn: false,
    };
    setPlayers((prevPlayers) =>
      prevPlayers ? [...prevPlayers, newPlayer] : [newPlayer],
    );
  };

  publicClient.watchContractEvent({
    address: "0x30A62f3F83e410D2c4b2C58c0F820822E9351e2c",
    abi: PokerdAbi,
    eventName: "PlayerLeft",
    onLogs: (logs) => removePlayerBet(logs),
  });

  const removePlayerBet = (logs: any) => {
    setPlayers((prevPlayers) =>
      prevPlayers
        ? prevPlayers.filter((player) => player.address !== logs[0].args.player)
        : [],
    );
  };

  publicClient.watchContractEvent({
    address: "0x30A62f3F83e410D2c4b2C58c0F820822E9351e2c",
    abi: PokerdAbi,
    eventName: "PlayerBet",
    onLogs: (logs) => updatePlayerBet(logs),
  });

  const updatePlayerBet = (logs: any) => {
    setPotAmount((prevPot) => prevPot + logs[0].args.betAmount);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFlop = async () => {
    try {
      const response = await fetch("/api/flop", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response :", response);
      const data = await response.json();
      console.log("date :", data);

      const formattedFlop = data.map(
        (card: { value: string; suit: string }) => ({
          rank: getValueRank(card.value),
          suit: getSuitSymbol(card.suit),
          color: getCardColor(card.suit),
        }),
      );

      setFlopCards(formattedFlop);
    } catch (error) {
      console.error("Error flop client", error);
    }
  };

  const getTurn = async () => {
    try {
      const response = await fetch("/api/turn", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      const formattedTurn: CardType = {
        rank: getValueRank(data[0].value),
        suit: getSuitSymbol(data[0].suit),
        color: getCardColor(data[0].suit),
      };

      setTurnCard(formattedTurn);
    } catch (error) {
      console.error("Error turn client", error);
    }
  };

  const getRiver = async () => {
    try {
      const response = await fetch("/api/river", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      const formattedRiver: CardType = {
        rank: getValueRank(data[0].value),
        suit: getSuitSymbol(data[0].suit),
        color: getCardColor(data[0].suit),
      };

      setRiverCard(formattedRiver);
    } catch (error) {
      console.error("Error river client", error);
    }
  };

  useEffect(() => {
    getFlop();
  }, []);

  const playerPositions = [
    { position: "bottom-0 left-1/2 -translate-x-1/2", isCurrentPlayer: true },
    { position: "bottom-0", isCurrentPlayer: false },
    { position: "top-0", isCurrentPlayer: false },
    { position: "top-0 right-0", isCurrentPlayer: false },
    { position: "bottom-0 right-0", isCurrentPlayer: false },
  ];

  const activePlayers = [
    {
      id: 1,
      name: "You (0xab1...4f6)",
      stack: "$48.25",
      bet: "$0.50",
      cards: [
        { rank: "A", suit: "♦", color: "text-red-600" },
        { rank: "A", suit: "♣", color: "text-black" },
      ],
      handStrength: "Pair of Aces",
      isYourTurn: true,
      position: 0,
    },
    {
      id: 2,
      name: "0x45f...a23",
      stack: "$35.75",
      bet: "$1.00",
      cards: null,
      position: 1,
    },
    {
      id: 3,
      name: "0x72c...9e5",
      stack: "$22.50",
      bet: "$2.00",
      cards: null,
      position: 2,
    },
    {
      id: 4,
      name: "0xf76...3b8",
      stack: "$67.25",
      bet: "$2.00",
      cards: null,
      position: 3,
    },
    {
      id: 5,
      name: "0x39d...c42",
      stack: "$42.00",
      bet: "$2.00",
      cards: null,
      position: 4,
    },
  ];

  const Card: React.FC<CardType> = ({ rank, suit, color }) => {
    if (!rank) {
      return <div className="w-12 h-16 lg:w-16 lg:h-20 bg-transparent" />;
    }

    return (
      <div
        className={`relative w-12 h-16 lg:w-16 lg:h-20 bg-white rounded shadow-md flex justify-center items-center ${color}`}
      >
        <span className="absolute top-1 left-1 text-sm font-bold">{rank}</span>
        <span className="text-2xl">{suit}</span>
      </div>
    );
  };

  const HiddenCard = () => (
    <div className="w-8 h-11 lg:w-10 lg:h-14 bg-blue-600 rounded shadow-md" />
  );

  const PlayerSpot = ({ player }: any) => {
    if (!player) return null;

    const pos = playerPositions[player.position]?.position || "";
    const isYourTurn = player.isYourTurn || false;

    return (
      <div
        className={`absolute ${pos} w-28 text-center ${
          isYourTurn ? "ring-4 ring-yellow-400 rounded-lg" : ""
        }`}
      >
        <div className="bg-black bg-opacity-70 p-2 rounded mb-1">
          <div className="font-bold text-sm truncate">{player.name}</div>
          <div className="text-xs">{player.stack}</div>
        </div>

        {player.bet && (
          <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs inline-block">
            {player.bet}
          </div>
        )}

        <div className="flex justify-center gap-1 mt-1">
          {player.cards ? (
            player.cards.map((card: any, i: any) => (
              <Card
                key={i}
                rank={card.rank}
                suit={card.suit}
                color={card.color}
              />
            ))
          ) : (
            <>
              <HiddenCard />
              <HiddenCard />
            </>
          )}
        </div>

        {player.handStrength && (
          <div className="text-gray-400 text-xs mt-2">
            {player.handStrength}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white">
      <header className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="text-2xl font-bold text-yellow-400">Pokerd</div>
        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          className="bg-yellow-400 text-black px-4 py-2 rounded font-bold"
        >
          Logout
        </Button>
      </header>
      <a
        href={`/dashboard`}
        className="block text-center bg-yellow-400 text-black py-3 mt-4"
      >
        {" "}
        Leave table
      </a>

      <div className="relative w-full h-screen max-h-screen flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-96 bg-green-800 rounded-full border-8 lg:border-12 border-amber-900">
          <div className="text-center">
            <div className="text-xl lg:text-2xl font-bold mb-2">
              Pot: ${potAmount}
            </div>
            <div className="flex gap-2 justify-center">
              {flopCards.map((card, i) => (
                <Card
                  key={i}
                  rank={card.rank}
                  suit={card.suit}
                  color={card.color}
                />
              ))}
              {turnCard && (
                <Card
                  rank={turnCard.rank}
                  suit={turnCard.suit}
                  color={turnCard.color}
                />
              )}
              {riverCard && (
                <Card
                  rank={riverCard.rank}
                  suit={riverCard.suit}
                  color={riverCard.color}
                />
              )}
            </div>

            {!turnCard && (
              <Button
                variant="contained"
                onClick={getTurn}
                className="bg-yellow-400 text-black px-4 py-2 rounded font-bold mt-2"
              >
                Show Turn Card
              </Button>
            )}

            {turnCard && !riverCard && (
              <Button
                variant="contained"
                onClick={getRiver}
                className="bg-yellow-400 text-black px-4 py-2 rounded font-bold mt-2"
              >
                Show River Card
              </Button>
            )}
          </div>

          {activePlayers.map((player) => (
            <PlayerSpot key={player.id} player={player} />
          ))}

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-yellow-400 flex items-center justify-center text-xl font-bold">
            {timeLeft}
          </div>
        </div>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black p-4 rounded-lg">
          <Button className="text-white bg-red-600">Fold</Button>
          <Button className="text-white bg-blue-600">Call $2.00</Button>
          <Button className="text-black bg-yellow-500">Raise</Button>
          <TextField
            label="Amount"
            type="number"
            className="w-40 text-white"
            value={raiseAmount}
            onChange={(e) => setRaiseAmount(Number.parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default PokerTable;
