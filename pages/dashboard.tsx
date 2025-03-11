import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

type DiscoverTable = {
	id: number;
	status: boolean;
	minBuyIn: number;
	maxBuyIn: number;
	smallBlind: number;
	bigBlind: number;
};

async function discoverTables() {
	return fetch("/api/discover").then(
		(res) => res.json() as Promise<DiscoverTable[]>,
	);
}

async function joinTableFn(tableId: number) {
	return fetch(`/api/table/${tableId}`, {
		method: "POST",
	}).then((res) => res.json());
}

export default function DashboardPage() {
	// const { data, isLoading } = useQuery({ queryKey: ["discover"], queryFn: discoverTables });
	// const queryClient = useQueryClient();

	// install lucide react ?
	// if (isLoading) {
	// 	return (
	// 		<div className="h-full w-full justify-center items-center flex">
	// 			<Loader2 className="animate-spin" />
	// 		</div>
	// 	);
	// }

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

	return (
		<div>
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

			<Box sx={{ flexGrow: 1 }} className="max-w-6xl text-white mx-auto p-6">
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{tables.map((table) => (
						<Grid
							size={{ xs: 2, sm: 4, md: 4 }}
							className="bg-gray-900 rounded"
							key={table.id}
						>
							<div className="flex justify-between items-center p-4 bg-gray-800">
								<div>{table.gameType}</div>
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
									className="block w-full text-center bg-yellow-400 text-black py-3 mt-4"
								>
									Join Table
								</a>
							</div>
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
}
