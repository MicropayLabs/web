import React, { FormEventHandler, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Modal from '../modal/Modal';
import classnames from 'classnames';
import { parseMatrixRoom, useMatrixClient } from '@lib/matrix';
import { Visibility } from 'matrix-js-sdk/lib/@types/partials';
import { ethers } from 'ethers';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';

export default function DirectMessageModal({ isOpen, onClose }) {
	const provider = new ethers.providers.Web3Provider((window as any).ethereum);
	const [friend, setFriend] = useState('');
	const matrixClient = useMatrixClient();
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		try {
			e.preventDefault();
			const ensName = await provider.resolveName(friend);
			const localPart = ensName?.toLowerCase() ?? friend;
			const userId = `@${localPart}:${matrixClient.getDomain()}`;
			const randomName = uuid();
			matrixClient
				.createRoom({
					room_alias_name: randomName,
					name: randomName,
					visibility: Visibility.Private, // or Visibility.Public
					invite: [userId], // a list of userIDs to invite
					topic: 'Direct Message',
				})
				.then(({ room_id }) => {
					onClose();
					matrixClient.joinRoom(room_id);
					console.log(room_id);
					router.push('/channels/@me/' + parseMatrixRoom(room_id));
				});
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form className="flex flex-col items-start" onSubmit={handleSubmit}>
				<Dialog.Title
					as="h1"
					className={classnames(
						'text-xl font-medium leading-6',
						'text-light-fg dark:text-dark-fg'
					)}
				>
					Send a DM
				</Dialog.Title>
				<p
					className={classnames(
						'text-sm mt-2 mb-4',
						'text-light-fg-subtle dark:text-dark-neutral-emphasis'
					)}
				>
					Add your friends by their public address or ENS username.
				</p>
				<div className="flex flex-row w-full">
					<label htmlFor="room" className="sr-only">
						Friend's Name
					</label>
					<input
						name="room"
						id="room"
						value={friend}
						onChange={(e) => setFriend(e.target.value)}
						className={classnames(
							'flex-1 px-4 py-2 rounded-md text-sm outline-none',
							'text-light-fg dark:text-dark-fg',
							'placeholder-light-fg-subtle dark:placeholder-dark-fg-subtle',
							'bg-light-canvas-subtle dark:bg-dark-canvas'
						)}
						placeholder="vitalik.eth"
					/>
					<button
						type="submit"
						className={classnames(
							'mt-3 w-full inline-flex items-center justify-center px-4 py-2',
							'shadow-sm shadow-light-shadow-sm dark:shadow-dark-shadow-sm',
							'text-light-fg-emphasis dark:text-dark-fg',
							'font-medium rounded-md',
							'bg-light-green-emphasis dark:bg-dark-green-fg/60',
							'hover:bg-light-green-fg dark:hover:bg-dark-green-fg/75',
							'sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
						)}
					>
						Send
					</button>
				</div>
				<p
					className={classnames(
						'text-sm mt-2 mb-4',
						'text-light-fg-subtle dark:text-dark-neutral-emphasis'
					)}
				>
					Suggestions
				</p>
			</form>
		</Modal>
	);
}
