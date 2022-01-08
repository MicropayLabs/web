import React from 'react';
import { parseMatrixUser, useMatrixClient } from '@lib/matrix';
import { useENS } from '@lib/eth';

export default function Member({ sender, content }): JSX.Element {
	const userAddress = parseMatrixUser(sender);
	const matrixClient = useMatrixClient();
	const name = useENS(userAddress);

	const membershipPhrases: Map<string, string> = new Map([
		['join', 'joined the room'],
		['invite', 'was invited to the room'],
		['leave', 'left the room'],
		['kick', 'has been kicked from the room'],
		['ban', 'has been banned from the room'],
	]);

	return (
		<div className="flex flex-row justify-center text-light-fg-muted dark:text-dark-fg-subtle">
			<span className="font-display text-xs pt-1">
				{name} {membershipPhrases.get(content.membership)}
			</span>
		</div>
	);
}
