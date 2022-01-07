import { useState } from 'react';
import { singletonHook } from 'react-singleton-hook';
import sdk, { MatrixClient } from 'matrix-js-sdk';

/**
 * The MatrixClient singleton.
 */
let _matrixClient: MatrixClient = undefined;

/**
 * An internal function to update the subscribers of the MatrixClient singleton.
 *
 * This is called after the client has been created and synced. This means that calls to
 * useMatrixClient() will return the same client instance and that instance will only be ready
 * after the first call to initMatrixClient() finishes.
 */
let _updateSubscribers = (_newClient: MatrixClient) => {};

/**
 * @returns The MatrixClient singleton.
 */
export const getMatrixClient = () => _matrixClient;

/**
 * Initialises the MatrixClient singleton.
 *
 * This function should be called once before any calls to useMatrixClient(). It will return a
 * promise that resolves when the client has been created and synced. This means that calls to
 * useMatrixClient() will return the same client instance and that instance will only be ready
 * after the first call to initMatrixClient() finishes.
 *
 * @param loginToken The login token to use to create the MatrixClient.
 */
export const initMatrixClient = async (loginToken: string): Promise<void> => {
	const MATRIX_URL = 'https://matrix.micropay.gg';
	// Options sent to the matrix server when creating the client.
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			type: 'org.matrix.login.jwt',
			token: loginToken,
		}),
	};

	// Create the client from the login token (username is the user's public address)
	const createMatrixClient = ({
		access_token: accessToken,
		user_id: userId,
	}): MatrixClient => {
		return sdk.createClient({
			baseUrl: MATRIX_URL,
			accessToken,
			userId,
		});
	};

	// Start the matrix client and configure it to sync that last 20 messages
	const startMatrixClient = async (
		matrix: MatrixClient
	): Promise<MatrixClient> => {
		matrix.startClient({
			initialSyncLimit: 25,
		});
		return matrix;
	};

	// Waits for the client to be 'PREPARED', then updates the instance and notifies the subscribers
	const waitForSync = (client: MatrixClient): void => {
		client.on('sync', (state, _prevState, _res) => {
			if (state === 'PREPARED') {
				_updateSubscribers(client);
			}
		});
	};

	if (loginToken && !_matrixClient) {
		await fetch(`${MATRIX_URL}/_matrix/client/r0/login`, options)
			.then((response) => response.json())
			.then(createMatrixClient)
			.then(startMatrixClient)
			.then(waitForSync);
	}
};

/**
 * The canonical instance of the MatrixClient singleton.
 *
 * The instance will be undefined until initMatrixClient() has been called and the client has been
 * created and synced. After that, the instance will be updated to be the same as the client and all
 * calls to useMatrixClient() will return the same instance.
 */
const useMatrixClientSDK = () => {
	const [client, setClient] = useState(_matrixClient);
	_updateSubscribers = setClient;
	return client;
};

export const useMatrixClient = singletonHook(_matrixClient, useMatrixClientSDK);
