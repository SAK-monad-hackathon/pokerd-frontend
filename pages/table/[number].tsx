import React, { useState, useEffect } from "react";

const PokerTable = () => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [raiseAmount, setRaiseAmount] = useState(4.0);

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

  const communityCards = [
    { rank: "A", suit: "♥", color: "text-red-600" },
    { rank: "K", suit: "♠", color: "text-black" },
    { rank: "7", suit: "♦", color: "text-red-600" },
    { rank: "9", suit: "♣", color: "text-black" },
    null, // The river card hasn't been dealt yet
  ];

  const playerPositions = [
    { position: "bottom-0 left-1/2 -translate-x-1/2", isCurrentPlayer: true },
    { position: "bottom-12 left-1/6", isCurrentPlayer: false },
    { position: "top-1/2 left-0 -translate-y-1/2", isCurrentPlayer: false },
    { position: "top-12 left-1/6", isCurrentPlayer: false },
    { position: "top-0 left-1/2 -translate-x-1/2", isCurrentPlayer: false },
    { position: "top-12 right-1/6", isCurrentPlayer: false },
    { position: "top-1/2 right-0 -translate-y-1/2", isCurrentPlayer: false },
    { position: "bottom-12 right-1/6", isCurrentPlayer: false },
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
      position: 4,
    },
    {
      id: 5,
      name: "0x39d...c42",
      stack: "$42.00",
      bet: "$2.00",
      cards: null,
      position: 6,
    },
  ];

  // Render a card (either community card or player card)
  const Card = ({ rank, suit, color }: any) => {
    if (!rank) {
      return <div className="w-12 h-16 lg:w-16 lg:h-20 bg-transparent"></div>;
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

  // Render hidden cards (for opponents)
  const HiddenCard = () => (
    <div className="w-8 h-11 lg:w-10 lg:h-14 bg-blue-600 rounded shadow-md"></div>
  );

  // Render a player spot
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
            // Show cards for current player
            player.cards.map((card: any, i: any) => (
              <Card
                key={i}
                rank={card.rank}
                suit={card.suit}
                color={card.color}
              />
            ))
          ) : (
            // Show hidden cards for opponents
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
    <div
      className="min-h-screen bg-gray-900 text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/api/placeholder/1920/1080')" }}
    >
      {/* Header */}
      <header className="bg-black bg-opacity-70 p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-yellow-400">Pokermon.ad</div>
        <div className="flex gap-4">
          <div className="bg-gray-800 bg-opacity-50 px-3 py-1 rounded">
            Texas Hold'em
          </div>
          <div className="bg-gray-800 bg-opacity-50 px-3 py-1 rounded">
            Blinds: $0.25/$0.50
          </div>
          <div className="bg-gray-800 bg-opacity-50 px-3 py-1 rounded">
            Hand #142
          </div>
        </div>
      </header>

      {/* Poker Table Area */}
      <div className="relative w-full h-screen max-h-screen overflow-hidden pt-4 pb-20 flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-96 bg-green-800 rounded-full border-8 lg:border-12 border-amber-900 shadow-2xl">
          {/* Pot and Community Cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-xl lg:text-2xl font-bold mb-2">
              Pot: $12.50
            </div>
            <div className="flex gap-2 justify-center">
              {communityCards.map((card, i) => (
                <Card
                  key={i}
                  rank={card?.rank}
                  suit={card?.suit}
                  color={card?.color}
                />
              ))}
            </div>
          </div>

          {/* Players */}
          {activePlayers.map((player) => (
            <PlayerSpot key={player.id} player={player} />
          ))}

          {/* Timer */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gray-800 rounded-full border-2 border-yellow-400 flex items-center justify-center text-xl font-bold">
            {timeLeft}
          </div>
        </div>

        {/* Player Actions */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black bg-opacity-80 p-4 rounded-lg z-10">
          <button className="bg-red-600 text-white px-5 py-2 rounded font-bold">
            Fold
          </button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded font-bold">
            Call $2.00
          </button>
          <div className="flex items-center gap-2">
            <button className="bg-yellow-500 text-black px-5 py-2 rounded font-bold">
              Raise
            </button>
            <input
              type="number"
              className="w-20 px-3 py-2 bg-gray-700 text-white rounded"
              value={raiseAmount}
              onChange={(e) => setRaiseAmount(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Leave Table Button */}
      <button className="fixed top-20 right-6 bg-red-600 text-white px-4 py-2 rounded font-bold">
        Leave Table
      </button>

      {/* Chat Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl shadow-lg">
        💬
      </button>
    </div>
  );
};

export default PokerTable;
