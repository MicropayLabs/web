import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Modal from '../modal/Modal';
import classnames from 'classnames';
import { useMatrixClient } from '@lib/matrix';
import { Visibility } from 'matrix-js-sdk/lib/@types/partials';

export default function DirectMessageModal({ isOpen, onClose }) {
	const [roomName, setRoomName] = useState('');
	const matrixClient = useMatrixClient();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { room_id } = await matrixClient.createRoom({
				room_alias_name: roomName,
				visibility: Visibility.Private, // or Visibility.Public
				invite: [], // a list of userIDs to invite
				name: roomName,
				topic: 'Direct Message',
			});
			console.log('Created room:', room_id);
			onClose();
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Dialog.Title
				as="h1"
				className={classnames('text-xl font-medium leading-6', 'text-light-fg dark:text-dark-fg')}
			>
				Create a Room
			</Dialog.Title>
			<div className="mt-2">
				<p
					className={classnames('text-sm', 'text-light-fg-subtle dark:text-dark-neutral-emphasis')}
				>
					Create a new room to start chatting with your friends.
				</p>
			</div>
			<form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
				<div className="w-full sm:max-w-xs">
					<label htmlFor="room" className="sr-only">
						Room Name
					</label>
					<input
						name="room"
						id="room"
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
						className={classnames(
							'px-4 py-2 w-full rounded-md text-sm outline-none',
							'text-light-fg dark:text-dark-fg',
							'placeholder-light-fg-subtle dark:placeholder-dark-fg-subtle',
							'bg-light-canvas dark:bg-dark-canvas'
						)}
						placeholder="My Room"
					/>
				</div>
				<button
					type="submit"
					className={classnames(
						'mt-3 w-full inline-flex items-center justify-center px-4 py-2',
						'shadow-sm shadow-light-shadow-sm dark:shadow-dark-shadow-sm',
						'text-light-fg dark:text-dark-fg',
						'font-medium rounded-md',
						'bg-light-green-fg dark:bg-dark-green-fg/60',
						'hover:bg-light-green-fg dark:hover:bg-dark-green-fg/75',
						'sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
					)}
				>
					Send
				</button>
			</form>
		</Modal>
	);
}
