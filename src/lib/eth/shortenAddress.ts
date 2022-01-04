export const shortenAddress = (address: string) => {
	if (!address) return '0x0000...0000';
	return address.slice(0, 6) + '...' + address.slice(-4);
};
