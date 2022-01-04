import React, { useState } from 'react';
import { ChatIcon, GlobeIcon, PencilIcon } from '@heroicons/react/solid';
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
	const _closeModalExplore = () => _setIsOpenExplore(false);
	const _openModalExplore = () => _setIsOpenExplore(true);

	return (
		<>
			<div className="flex flex-col gap-3 justify-center mx-auto text-center">
				<h1 className="text-3xl text-light-fg dark:text-dark-fg">Welcome to Micropay</h1>
				<p className="text-md text-light-fg-muted dark:text-dark-fg-muted">
					The buttons below don't do anything yet.
				</p>
				<div className="mt-8 flex flex-row gap-8">
					<button
						className={classnames(
							'px-4 py-2 w-36 h-36 rounded-lg justify-center',
							'text-light-green-fg dark:text-dark-green-fg',
							'bg-light-green-subtle/10 dark:bg-dark-green-subtle/10',
							'hover:bg-light-green-subtle/20 dark:hover:bg-dark-green-subtle/20',
							'border border-light-green-emphasis dark:border-dark-green-emphasis',
							'hover:border-light-green-fg dark:hover:border-dark-green-fg',
							'shadow-md shadow-light-shadow-md dark:shadow-dark-shadow-md',
							'hover:shadow-lg hover:shadow-light-shadow-lg dark:hover:shadow-dark-shadow-lg'
						)}
						onClick={openModalDM}
					>
						<ChatIcon className="w-12 h-12 mx-auto mb-2" />
						<span className="mx-auto">Send a direct message</span>
					</button>
					<button
						className={classnames(
							'px-4 py-2 rounded-lg w-36 h-36',
							'text-light-green-fg dark:text-dark-green-fg',
							'bg-light-green-subtle/10 dark:bg-dark-green-subtle/10',
							'border border-light-green-emphasis dark:border-dark-green-emphasis',
							'hover:bg-light-green-subtle/20 dark:hover:bg-dark-green-subtle/20',
							'hover:border-light-green-fg dark:hover:border-dark-green-fg',
							'shadow-md shadow-light-shadow-md dark:shadow-dark-shadow-md',
							'hover:shadow-lg hover:shadow-light-shadow-lg dark:hover:shadow-dark-shadow-lg'
						)}
						onClick={openModalDAO}
					>
						<PencilIcon className="w-12 h-12 mx-auto mb-2" />
						<span className="mx-auto">Create your own DAO</span>
					</button>
					<button
						className={classnames(
							'px-4 py-2 rounded-lg w-36 h-36',
							'text-light-green-fg dark:text-dark-green-fg',
							'bg-light-green-subtle/10 dark:bg-dark-green-subtle/10',
							'hover:bg-light-green-subtle/20 dark:hover:bg-dark-green-subtle/20',
							'border border-light-green-emphasis dark:border-dark-green-emphasis',
							'hover:border-light-green-fg dark:hover:border-dark-green-fg',
							'shadow-md shadow-light-shadow-md dark:shadow-dark-shadow-md',
							'hover:shadow-lg hover:shadow-light-shadow-lg dark:hover:shadow-dark-shadow-lg'
						)}
						onClick={() => alert('Do you even read?')}
					>
						<GlobeIcon className="w-12 h-12 mx-auto mb-2" />
						<span className="mx-auto">Explore public DAOs</span>
					</button>
				</div>
			</div>
			<DirectMessageModal isOpen={isOpenDM} onClose={closeModalDM} />
			<CreateDAOModal isOpen={isOpenDAO} onClose={closeModalDAO} />
		</>
	);
}
