import React, { useState } from 'react';
import { ChatIcon, PencilIcon } from '@heroicons/react/solid';
import { GlobeAltIcon } from '@heroicons/react/outline';
import DirectMessageModal from './DirectMessageModal';
import CreateDAOModal from './CreateDAOModal';
import classnames from 'classnames';

export default function EmptyState() {
	const [isOpenDM, setIsOpenDM] = useState(false);
	const [isOpenDAO, setIsOpenDAO] = useState(false);
	const [_isOpenExplore, _setIsOpenExplore] = useState(false);

	const closeModalDM = () => setIsOpenDM(false);
	const openModalDM = () => setIsOpenDM(true);
	const closeModalDAO = () => setIsOpenDAO(false);
	const openModalDAO = () => setIsOpenDAO(true);

	return (
		<>
			<div className="flex flex-col w-full h-screen gap-3 justify-center mx-auto text-center dark:bg-dark-canvas-inset">
				<h1 className="text-3xl text-light-fg dark:text-dark-fg">
					Welcome to Micropay
				</h1>
				<p className="text-md text-light-fg-muted dark:text-dark-fg-muted">
					Scalable infrastructure for decentralized organizations.
				</p>
				<div className="mt-8 flex flex-row gap-8 justify-center">
					<button
						className={classnames(
							'px-4 py-2 w-36 h-36 rounded-lg justify-center',
							'text-light-purple-fg dark:text-dark-purple-fg',
							'bg-light-purple-subtle dark:bg-dark-purple-subtle/10',
							'hover:bg-light-purple-muted dark:hover:bg-dark-purple-subtle/20',
							'border border-light-purple-emphasis dark:border-dark-purple-emphasis',
							'hover:border-light-purple-fg dark:hover:border-dark-purple-fg',
							'shadow-md shadow-light-shadow-md dark:shadow-dark-shadow-md',
							'hover:shadow-lg hover:shadow-light-shadow-lg dark:hover:shadow-dark-shadow-lg',
							'outline-none'
						)}
						onClick={openModalDM}
					>
						<ChatIcon className="w-12 h-12 mx-auto mb-2" />
						<span className="mx-auto">Send a DM</span>
					</button>
					<button
						className={classnames(
							'px-4 py-2 rounded-lg w-36 h-36',
							'text-light-purple-fg dark:text-dark-purple-fg',
							'bg-light-purple-subtle dark:bg-dark-purple-subtle/10',
							'border border-light-purple-emphasis dark:border-dark-purple-emphasis',
							'hover:bg-light-purple-muted dark:hover:bg-dark-purple-subtle/20',
							'hover:border-light-purple-fg dark:hover:border-dark-purple-fg',
							'shadow-md shadow-light-shadow-md dark:shadow-dark-shadow-md',
							'hover:shadow-lg hover:shadow-light-shadow-lg dark:hover:shadow-dark-shadow-lg'
						)}
						onClick={openModalDAO}
					>
						<PencilIcon className="w-12 h-12 mx-auto mb-2" />
						<span className="mx-auto">Create a DAO</span>
					</button>
					<button
						className={classnames(
							'px-4 py-2 rounded-lg w-36 h-36',
							'text-light-purple-fg dark:text-dark-purple-fg',
							'bg-light-purple-subtle dark:bg-dark-purple-subtle/10',
							'hover:bg-light-purple-muted dark:hover:bg-dark-purple-subtle/20',
							'border border-light-purple-emphasis dark:border-dark-purple-emphasis',
							'hover:border-light-purple-fg dark:hover:border-dark-purple-fg',
							'shadow-md shadow-light-shadow-md dark:shadow-dark-shadow-md',
							'hover:shadow-lg hover:shadow-light-shadow-lg dark:hover:shadow-dark-shadow-lg'
						)}
						onClick={() => alert('Do you even read?')}
					>
						<GlobeAltIcon className="w-12 h-12 mx-auto mb-2" />
						<span className="mx-auto">Explore DAOs</span>
					</button>
				</div>
			</div>
			<DirectMessageModal isOpen={isOpenDM} onClose={closeModalDM} />
			<CreateDAOModal isOpen={isOpenDAO} onClose={closeModalDAO} />
		</>
	);
}
