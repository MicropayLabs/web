import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { parseMatrixRoom, useMatrixClient } from '@lib/matrix';
import { User } from 'matrix-js-sdk';
import { useRouter } from 'next/router';

export default function Presence(): JSX.Element {
	const [users, setUsers] = useState<User[]>([]);
	const matrixClient = useMatrixClient();

	useEffect(() => {
		if (matrixClient) {
			setUsers(matrixClient.getUsers());
		}
		return () => {
			matrixClient.removeAllListeners();
		};
	}, [matrixClient]);

	return (
		<>
			<span
				className={classnames(
					'flex flex-row items-center justify-between mt-4'
				)}
			>
				<span
					className={classnames(
						'text-light-fg-muted dark:text-dark-fg-muted',
						'uppercase'
					)}
				>
					My Friends
				</span>
			</span>
			<div className="flex flex-col gap-2">
				{users.map((user) => (
					<div
						key={user.userId}
						className={classnames(
							'flex flex-row items-center justify-between text-md',
							'text-light-fg dark:text-dark-fg',
							'cursor-pointer'
						)}
					>
						<span>
							{user && user.displayName
								? user.displayName.substring(0, 18)
								: 'Anonymous User'}
						</span>
					</div>
				))}
			</div>
		</>
	);
}
