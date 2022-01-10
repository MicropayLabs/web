import React from 'react';
import classnames from 'classnames';

export default function RightContextMenu() {
	return (
		<div
			className={classnames(
				'flex flex-col py-3 pl-4 pr-2 gap-3 w-64 h-full',
				'bg-light-canvas-inset dark:bg-dark-canvas-inset'
			)}
		>
			<span
				className={classnames(
					'flex flex-row items-center justify-between mt-4',
					'text-light-fg-muted dark:text-dark-fg-muted',
					'uppercase'
				)}
			>
				Friend Activity
			</span>
			<div className="flex-1" />
		</div>
	);
}
