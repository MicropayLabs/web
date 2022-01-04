import React from 'react';
import { Dialog } from '@headlessui/react';
import Modal from '../modal/Modal';
import classnames from 'classnames';

export default function CreateDAOModal({ isOpen, onClose }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		alert("I told you this doesn't do anything yet.");
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Dialog.Title
				as="h1"
				className={classnames('text-xl font-medium leading-6', 'text-light-fg dark:text-dark-fg')}
			>
				Create a DAO
			</Dialog.Title>
			<div className="mt-2">
				<p
					className={classnames('text-sm', 'text-light-fg-subtle dark:text-dark-neutral-emphasis')}
				>
					Add your friends by their public address or ENS username. Launch to mainnet in one
					click.
				</p>
			</div>
			<form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
				<div className="w-full sm:max-w-xs">
					<label htmlFor="address" className="sr-only">
						Address
					</label>
					<input
						name="address"
						id="address"
						className={classnames(
							'px-4 py-2 w-full rounded-md text-sm outline-none',
							'text-light-fg dark:text-dark-fg',
							'placeholder-light-fg-subtle dark:placeholder-dark-fg-subtle',
							'bg-light-canvas dark:bg-dark-canvas'
						)}
						placeholder="sorenrood.eth, justinshaw.eth"
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
					Launch
				</button>
			</form>
		</Modal>
	);
}
