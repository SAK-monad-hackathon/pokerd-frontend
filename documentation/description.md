Team Name \*
SAK

Project Name \*
Pokermon.ad

Project Description
Provide an overall description of your project in 1 paragraph or less \*
On-chain, decentralized and autonomous poker tables with verifiable randomness and full privacy.

Problem Statement
What problem does your project address \*
Depositing money into a casino or gambling websites requires trusting a third party with your money and data. Those systems are also fully opaque, with no way to verify if it's actively stacking the deck against you.

Proposed Solution
How does your application address the problem using Monad's accelerated EVM \*
With Monad's performance, we could achieve autonomous poker tables that only holds the money it needs for the current hand, verifiable randomness with oracles, security and privacy with zero knowledge proofs, and a user experience that would rival those of giants of the industry with crypto wallets integrations thanks to Privy.

Key Features
Please list 2-3 core features of the application \*

Autonomous and decentralized operations

No custody of funds

Verifiable randomness and full privacy

Target Users

Who are your intended user and how will they interact with your application? \*

Poker enthusiasts that already have funds on-chain (stable coin or others).

Potential Blockers

List any potential challenges and areas where your team might need support \*

Zero knowledge proofs and circuits integration, graphic design.

Technical Approach

Briefly describe your planned technical implementation \*

Autonomy and decentralization: The poker tables (Texas Hold'em) will be smart contracts that users can interact with. As the cards only need to be revealed at the end or when no more bets are possible (all-in), the game can advance without revealing any info on the hand of the users.
Privacy and anti-cheat: Zero knowledge proofs will be used at the end of a hand to determine which user has the strongest and win the pot.
Keepers: A system of keepers can be introduced to start new rounds if needed and unsure smooth gameplay.
Verifiable randomness: A hashed seed can be given at the beginning of the round that would prove that the randomness was locked in before the hand starts, and the real seed can be submitted when cards are revealed at the end. Still need to figure out how to get a verifiable and trust worthy seed without revealing it too early (so on-chain VRF a la Chainlink might not be an option)

The system should be autonomous enough so that different frontends can be developed by third party, adding their own retention features in exchange for an additional rake, maybe a hook system could allow that.
