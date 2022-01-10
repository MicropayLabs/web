import React from 'react';
import classnames from 'classnames';
import UserMenu from './UserMenu';
import DirectMessages from './DirectMessages';

export default function LeftContextMenu({ address, onLogout }) {
	return (
		<div
			className={classnames(
				'flex flex-col py-3 pl-4 pr-2 gap-3 w-64 h-full',
				'bg-light-canvas-inset dark:bg-dark-canvas-inset'
			)}
		>
			<DirectMessages />
			<div className="flex-1" />
			<UserMenu address={address} onLogout={onLogout} />
		</div>
	);
}
