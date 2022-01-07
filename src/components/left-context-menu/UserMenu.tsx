import React, { Fragment } from 'react';
import classnames from 'classnames';
import { Menu, Transition } from '@headlessui/react';
import { useENS, shortenAddress } from '@lib/eth';
import { Jazzicon } from '@ukstv/jazzicon-react';

export default function UserMenu({ address, onLogout }) {
	const name = useENS(address);

	return (
		<Menu as="div" className="relative inline-block text-left">
			<Menu.Button
				className={classnames(
					'inline-flex justify-left mb-2 px-3 w-full rounded-lg outline-none',
					'text-sm font-medium',
					'hover:bg-light-canvas dark:hover:bg-dark-canvas'
				)}
			>
				<div
					className={classnames(
						'flex flex-row my-2.5 items-center space-x-3',
						'text-light-fg dark:text-dark-fg'
					)}
				>
					<Jazzicon className="w-8 h-8 opacity-75" address={address} />
					<div className="flex-1 min-w-0">
						<p className={classnames('text-md font-medium')}>{name}</p>
						<p
							className={classnames(
								'text-xs truncate text-left font-normal',
								'text-light-fg-subtle dark:text-dark-fg-subtle'
							)}
						>
							{shortenAddress(address)}
						</p>
					</div>
				</div>
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					className={classnames(
						'w-full mt-2 rounded-md outline-none',
						'absolute bottom-[4.5rem] left-0',
						'backdrop-blur-md bg-light-canvas dark:bg-dark-red-muted/5',
						'dark:hover:bg-dark-red-muted/10',
						'divide-y divide-light-neutral-muted dark:divide-dark-neutral-muted',
						'shadow-md shadow-light-shadow-md dark:shadow-dark-shadow-md',
						'hover:shadow-lg hover:shadow-light-shadow-lg dark:hover:shadow-dark-shadow-lg',
						'ring-1 ring-light-red-fg dark:ring-dark-red-fg'
					)}
				>
					<div>
						<Menu.Item>
							{({ active }) => (
								<button
									className={classnames(
										active ?? 'bg-light-canvas-inset',
										'group flex rounded-md w-full px-2 py-2 font-medium text-sm',
										'text-light-red-fg dark:text-dark-red-fg'
									)}
									onClick={onLogout}
								>
									Log out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
