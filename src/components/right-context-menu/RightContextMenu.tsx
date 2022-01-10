import React from 'react';
import classnames from 'classnames';
import Presence from './Presence';

export default function RightContextMenu() {
	return (
		<div
			className={classnames(
				'flex flex-col py-3 pl-4 pr-2 gap-3 w-64 h-full',
				'bg-light-canvas-inset dark:bg-dark-canvas-inset'
			)}
		>
			<Presence />
			<div className="flex-1" />
		</div>
	);
}
