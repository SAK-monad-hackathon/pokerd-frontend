import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { ready, authenticated, logout } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const tables = [
    {
      id: 1,
      gameType: "Texas Hold'em",
      status: "active",
      stakes: "$0.25/$0.50",
      players: "5/9",
      minBuyIn: "$25",
      maxBuyIn: "$50",
    },
    {
      id: 2,
      gameType: "Texas Hold'em",
      status: "waiting",
      stakes: "$0.05/$0.10",
      players: "2/6",
      minBuyIn: "$5",
      maxBuyIn: "$10",
    },
    {
      id: 3,
      gameType: "Texas Hold'em",
      status: "active",
      stakes: "$1/$2",
      players: "8/9",
      minBuyIn: "$100",
      maxBuyIn: "$200",
    },
    {
      id: 4,
      gameType: "Texas Hold'em",
      status: "waiting",
      stakes: "$0.01/$0.02",
      players: "1/6",
      minBuyIn: "$1",
      maxBuyIn: "$2",
    },
    {
      id: 5,
      gameType: "Texas Hold'em",
      status: "active",
      stakes: "$0.50/$1",
      players: "6/9",
      minBuyIn: "$50",
      maxBuyIn: "$100",
    },
  ];

  const createTable = () => {
    setShowCreateModal(false);
    alert("Table created successfully!");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="text-2xl font-bold text-yellow-400">Pokermon.ad</div>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">
          Connect Wallet
        </button>
        <button
          onClick={logout}
          className="bg-yellow-400 text-black px-4 py-2 rounded font-bold"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-500 text-black px-5 py-3 rounded font-bold text-lg"
          >
            Create New Table
          </button>

          <div className="flex gap-3">
            <select className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600">
              <option>All Stakes</option>
              <option>Micro ($0.01/$0.02)</option>
              <option>Low ($0.05/$0.10)</option>
              <option>Medium ($0.25/$0.50)</option>
              <option>High ($1/$2+)</option>
            </select>

            <select className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Waiting</option>
            </select>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:transform hover:-translate-y-1 transition-transform duration-200 hover:shadow-lg"
            >
              <div className="flex justify-between items-center p-4 bg-gray-700">
                <div className="font-bold">{table.gameType}</div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    table.status === "active"
                      ? "bg-green-500 text-black"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {table.status === "active" ? "Active" : "Waiting"}
                </span>
              </div>

              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <span>Stakes</span>
                  <span>{table.stakes}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Players</span>
                  <span>{table.players}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Min/Max Buy-in</span>
                  <span>
                    {table.minBuyIn}/{table.maxBuyIn}
                  </span>
                </div>

                <a
                  href={`/table/${table.id}`}
                  className="block w-full text-center bg-yellow-400 text-black py-3 mt-4 rounded font-bold"
                >
                  Join Table
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Table Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create New Table</h2>
              <button
                className="text-2xl"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Game Type</label>
              <select className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600">
                <option>Texas Hold'em</option>
                <option>Omaha</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Small Blind</label>
              <input
                type="text"
                placeholder="0.01"
                className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Big Blind</label>
              <input
                type="text"
                placeholder="0.02"
                className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Min Buy-in</label>
              <input
                type="text"
                placeholder="1"
                className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Max Buy-in</label>
              <input
                type="text"
                placeholder="2"
                className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Max Players</label>
              <select className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600">
                <option>2</option>
                <option>6</option>
                <option selected>9</option>
              </select>
            </div>

            <button
              className="w-full bg-green-500 text-black py-3 rounded font-bold mt-2"
              onClick={createTable}
            >
              Create Table
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
