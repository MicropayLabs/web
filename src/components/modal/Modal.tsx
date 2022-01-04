import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import classnames from 'classnames';

export default function Modal({ isOpen, onClose, children }) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
				<div
					className={classnames(
						'min-h-screen px-4 text-center',
						'bg-light-canvas/50 dark:bg-dark-canvas-inset/80'
					)}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="inline-block h-screen align-middle" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div
							className={classnames(
								'inline-block w-full max-w-md p-6 my-8',
								'overflow-hidden text-left align-middle transition-all transform',
								'bg-light-canvas dark:bg-dark-canvas-overlay',
								'shadow-xl rounded-lg'
							)}
						>
							{children}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
