import React, { useState } from 'react';
import { ethers } from 'ethers';
import { generateSignatureMessage } from '@lib/eth';
import classnames from 'classnames';
import Web3 from 'web3';
import Footer from './footer';

export const Landing = ({ onLoggedIn }): JSX.Element => {
	const [message, setMessage] = useState('Login with Metamask'); // Loading button state
	const [isClickable, setIsClickable] = useState(true);

	const handleClick = async () => {
		try {
			// Check if MetaMask is installed -- MetaMask injects window.ethereum into each page
			if ((window as any).ethereum) {
				(window as any).web3 = new Web3((window as any).ethereum);
				await (window as any).ethereum.enable(); // depreciated
			} else if ((window as any).web3) {
				// Legacy dapp browsers (accounts always exposed)
				(window as any).web3 = new Web3((window as any).web3.currentProvider);
			} else {
				// Non-dapp browsers...
				window.alert('ur ngmi - go install MetaMask you heathen');
				return;
			}
			const provider = new ethers.providers.Web3Provider(
				(window as any).ethereum
			);
			const signer = provider.getSigner();
			const publicAddress = await signer.getAddress();

			setMessage('Waiting for Signature...');
			setIsClickable(false);

			const toJSON = (response: Response) => response.json();

			const handleSignMessage = async ({
				publicAddress,
				nonce,
			}: {
				publicAddress: string;
				nonce: string;
			}) => {
				try {
					const msg = generateSignatureMessage(nonce);
					const sig = await signer.signMessage(msg);
					return { publicAddress, signature: sig };
				} catch (err) {
					console.error(err);
					throw new Error('You need to sign the message to be able to log in.');
				}
			};

			const handleAuthenticate = async ({ publicAddress, signature }) => {
				setMessage('Verifying Signature...');
				const response = await fetch('/api/auth', {
					method: 'POST',
					body: JSON.stringify({ publicAddress, signature }),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				return toJSON(response);
			};

			// Look if user with current publicAddress is already present on backend
			const options = {
				method: 'POST',
				body: JSON.stringify({ publicAddress }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			fetch('/api/nonce', options)
				.then(toJSON)
				.then(handleSignMessage) // Popup MetaMask confirmation modal to sign message
				.then(handleAuthenticate) // Send signature to backend on the /auth route
				.then(onLoggedIn) // Pass accessToken back to parent component (to save it in localStorage?)
				.catch((err) => {
					window.alert(err);
				});
		} catch (err) {
			alert(err.message);
		} finally {
			setMessage('Login with Metamask');
			setIsClickable(true);
		}
	};

	return (
		<main className="flex flex-col w-full">
			<div
				className={classnames(
					'max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8',
					'flex-1 flex flex-col justify-center mx-auto'
				)}
			>
				<h2 className="text-3xl font-extrabold text-light-fg-muted dark:text-dark-fg-muted sm:text-4xl">
					<span className="block">Welcome to Micropay</span>
				</h2>
				<p className="mt-4 text-lg leading-6 text-light-fg-subtle dark:text-dark-fg-subtle">
					Scalable infrastructure for decentralized organizations.
				</p>
				<button
					className={classnames(
						'px-4 py-2 mt-8 mx-auto rounded-md',
						'text-light-orange-fg dark:text-dark-orange-fg',
						'bg-light-orange-subtle dark:bg-dark-orange-subtle',
						'border border-light-orange-emphasis dark:border-dark-orange-emphasis',
						'hover:border-light-orange-fg dark:hover:border-dark-orange-fg',
						'shadow-md shadow-light-shadow-md dark:shadow-dark-shadow-md',
						'hover:shadow-lg hover:shadow-light-shadow-lg dark:hover:shadow-dark-shadow-lg'
					)}
					onClick={() => isClickable && handleClick()}
				>
					{message}
				</button>
			</div>
			<Footer />
		</main>
	);
};
