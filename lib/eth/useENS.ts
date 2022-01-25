import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { shortenAddress } from './shortenAddress';

export const useENS = (publicAddress: string) => {
	const [ensName, setENSName] = useState<string>(shortenAddress(publicAddress));
	const provider = new ethers.providers.Web3Provider((window as any).ethereum);

	useEffect(() => {
		const getENSName = async () => {
			const name = await provider.lookupAddress(publicAddress);
			name && setENSName(name);
		};
		getENSName();
	}, []);

	return ensName;
};
