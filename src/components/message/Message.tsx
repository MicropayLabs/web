import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { parseMatrixUser } from '@lib/matrix';
import classnames from 'classnames';
import { useENS } from '@lib/eth';
import TimeAgo from 'react-timeago';

export default function Message({
	sender,
	prev,
	content,
	isLastMessage,
	timestamp,
}) {
	const userAddress = parseMatrixUser(sender);
	const name = useENS(userAddress);
	const withSenderIcon =
		prev?.sender !== sender ||
		prev?.content?.msgtype !== 'm.text' ||
		prev.timestamp + 600000 < timestamp;

	return (
		<div
			className={classnames(
				'group flex flex-row w-full py-0.5',
				'hover:bg-light-canvas-subtle dark:hover:bg-dark-canvas-inset/30',
				'text-light-fg dark:text-dark-fg',
				withSenderIcon && 'mt-4'
			)}
		>
			{withSenderIcon ? (
				<div className="flex flex-col justify-start">
					<Jazzicon
						className="w-10 h-10 mx-5 mt-2 opacity-75"
						address={userAddress}
					/>
				</div>
			) : (
				<div className="w-20 flex flex-row justify-center">
					<span
						className={classnames(
							'font-display text-xs pt-1',
							'text-light-canvas dark:text-dark-canvas-inset',
							'group-hover:text-light-neutral-muted dark:group-hover:text-dark-neutral-muted'
						)}
					>
						{new Date(timestamp).toLocaleTimeString('en-US', {
							timeStyle: 'short',
						})}
					</span>
				</div>
			)}
			<div className="flex-1 flex flex-col">
				{withSenderIcon && (
					<div className="flex flex-row gap-2 my-1 items-baseline">
						<span className="text-md font-bold text-light-fg dark:text-dark-fg/90">
							{name}
						</span>
						<TimeAgo
							className="pl-2 font-display text-sm text-light-neutral-muted dark:text-dark-neutral-muted"
							minPeriod={60}
							date={new Date(timestamp)}
						/>
					</div>
				)}
				<span className="text-md font-light text-light-fg/80 dark:text-dark-fg/80">
					{content.body}
				</span>
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
