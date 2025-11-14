// Minimal ABI for the check-in contract you specified earlier.
// Replace address with your deployed contract on Base.
export const CHECKIN_CONTRACT_ADDRESS = 'REPLACE_WITH_YOUR_CONTRACT_ADDRESS'
export const CHECKIN_ABI = [
  {
    "inputs": [],
    "name": "mark",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType":"address","name":"user","type":"address"}],
    "name":"getStreak",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  }
]
