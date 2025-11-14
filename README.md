# DeBaseApp (starter)

Minimal Next.js starter for the DeBase daily on-chain check-in MVP.

## What this repo includes
- Wallet connect via RainbowKit + Wagmi
- Base network config (update RPC if you use paid provider)
- First-open "Add to favorites" modal
- Daily check-in modal that calls a `mark()` contract method (replace address/ABI)
- Minimal Neynar score placeholder

## Setup
1. `npm install`  
2. Replace `lib/contract.js` contract address with your deployed checkin contract.  
3. Optionally replace RPC in `utils/chains.js` with your Alchemy/QuickNode URL.  
4. `npm run dev` and open http://localhost:3000

## Notes
- The Neynar score calls are placeholders. Integrate the Neynar SDK / API to fetch real data.
- Real on-chain task verification should be handled server-side for trust; this demo uses direct contract calls via signer for check-in.

