export const generateSignatureMessage = (nonce: string) => {
	return `Welcome to Micropay!

  Click "sign" to login - no password needed! This request will not trigger a blockchain
  transaction or cost any gas fees.
  
  Your session will be reset after 24 hours.

  Nonce: ${nonce}`;
};
