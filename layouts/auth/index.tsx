/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import * as auth from '@matrix/action/auth';
import cons from '@matrix/state/cons';
import { getUrlPrams } from '@util/common';
import classnames from 'classnames';
import { ethers } from 'ethers';
import { generateSignatureMessage } from '@lib/eth';
import Web3 from 'web3';
import Footer from './Footer';
import Grid from './Grid';

function Auth() {
	const IS_TRON_THEMED = false;
	const [loginToken, setLoginToken] = useState(undefined);
	const [message, setMessage] = useState('Login with Metamask'); // Loading button state
	const [isClickable, setIsClickable] = useState(true);

	useEffect(() => {
		(async () => {
			if (!loginToken) return;
			if (localStorage.getItem(cons.secretKey.BASE_URL) === undefined) {
				setLoginToken(null);
				return;
			}
			const baseUrl = localStorage.getItem(cons.secretKey.BASE_URL);
			try {
				await auth.loginWithToken(baseUrl, loginToken);
				const { href } = window.location;
				window.location.replace(href.slice(0, href.indexOf('?')));
			} catch {
				setLoginToken(null);
			}
		})();
	}, []);

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
			const BASE_URL = 'https://matrix.micropay.gg';
			fetch('/api/nonce', options)
				.then(toJSON)
				.then(handleSignMessage) // Popup MetaMask confirmation modal to sign message
				.then(handleAuthenticate) // Send signature to backend on the /auth route
				.then(({ loginToken }) => auth.loginWithToken(BASE_URL, loginToken))
				.catch((err) => {
					console.error(err);
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
		<main className="flex flex-col w-screen h-screen">
			{IS_TRON_THEMED && <Grid />}
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
						'px-4 py-2 mt-8 mx-auto rounded-md border',
						'text-light-orange-fg dark:text-dark-orange-fg',
						'bg-light-orange-subtle dark:bg-dark-orange-subtle',
						'hover:bg-light-orange-muted/20 dark:hover:bg-dark-orange-muted/20',
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
}

export default Auth;
