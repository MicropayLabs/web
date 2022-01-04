import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { parseMatrixUser } from '@lib/matrix';
import classnames from 'classnames';
import { useENS } from '@lib/eth';

export default function Message({ sender, prevSender, content, isLastMessage, timestamp }) {
	const userAddress = parseMatrixUser(sender);
	const name = useENS(userAddress);

	return (
		<div
			className={classnames(
				'group flex flex-row w-full py-0.5',
				'hover:bg-light-canvas-subtle dark:hover:bg-dark-canvas-inset/30',
				'text-light-fg dark:text-dark-fg'
			)}
		>
			{prevSender !== sender ? (
				<Jazzicon className="w-10 h-10 mx-5 my-auto" address={userAddress} />
			) : (
				<div className="w-20 flex flex-row justify-center">
					<span
						className={classnames(
							'font-display text-xs pt-1 text-transparent',
							'group-hover:text-light-neutral-muted dark:group-hover:text-dark-neutral-muted'
						)}
					>
						{new Date(timestamp).toLocaleTimeString('en-US', { timeStyle: 'short' })}
					</span>
				</div>
			)}
			<div className="flex-1 flex flex-col">
				{prevSender !== sender && (
					<div className="flex flex-row gap-2 items-baseline">
						<span className="text-md font-medium text-white">{name}</span>
						<span className="font-display text-xs text-light-neutral-muted dark:text-dark-neutral-muted">
							{new Date(timestamp).toLocaleDateString('en-US')}
						</span>
					</div>
				)}
				<span className="text-md text-light-fg-muted dark:text-dark-fg-muted">{content.body}</span>
			</div>
			<span className="w-10 mx-5" />
			{isLastMessage && (
				<div className="pr-4 flex flex-col justify-center">
					<CheckCircleIcon
						className="w-4 h-4 text-light-neutral-muted dark:text-dark-neutral-muted"
						aria-hidden="true"
					/>
				</div>
			)}
		</div>
	);
}
