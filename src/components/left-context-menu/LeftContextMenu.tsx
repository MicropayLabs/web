import React from 'react';
import classnames from 'classnames';
import UserMenu from './UserMenu';
import { useENS } from '@lib/eth';

export default function LeftContextMenu({ address, onLogout }) {
	const name = useENS(address);

	return (
		<div
			className={classnames(
				'flex flex-col py-3 pl-4 pr-2 gap-3 w-64 h-full',
				'bg-dark-canvas dark:bg-dark-canvas-subtle'
			)}
		>
			<h1 className="mt-4 text-dark-fg text-md font-mono text-left">gm, {name}</h1>
			<div className="flex-1" />
			<UserMenu address={address} onLogout={onLogout} />
		</div>
	);
}
