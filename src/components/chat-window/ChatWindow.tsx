import React, { useState, useEffect } from 'react';
import Message from './Message';
import { useMatrixClient } from '@lib/matrix';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import EmptyState from '../empty-state/EmptyState';
import classnames from 'classnames';
import { IEvent } from 'matrix-js-sdk';

export default function ChatWindow() {
	const matrixClient = useMatrixClient();
	const [messages, setMessages] = useState<Partial<IEvent>[]>([]);
	const [roomName, setRoomName] = useState(undefined);

	const updateRooms = () => {
		const rooms = matrixClient.getVisibleRooms();
		console.log(rooms ? `${rooms.length} room(s)` : 'no rooms found');
		if (rooms.length === 0) {
			console.log('no more rooms');
			setRoomName(undefined);
			setMessages([]);
		} else {
			console.log(rooms[0]);
			setRoomName(rooms[0].name);
			setMessages(rooms[0].timeline.map((matrixEvent) => matrixEvent.event));
		}
	};

	useEffect(() => {
		if (matrixClient) {
			updateRooms();
			matrixClient.on('Room.timeline', (matrixEvent) => {
				if (matrixEvent.getType() === 'm.room.message') {
					setMessages((oldEvents) => [...oldEvents, matrixEvent.event]);
				}
			});
			matrixClient.on('event', (event) => {
				console.log('recieved a new', event.getType(), 'event');
				console.log(event);
				if (event.getType() === 'm.room.member') {
					const { membership } = event.getContent();
					if (membership === 'join') {
						updateRooms();
					} else if (membership === 'leave') {
						matrixClient.forget(event.getRoomId()).then(() => updateRooms());
					}
				} else if (event.getType() === 'm.room.name') {
					updateRooms();
				}
			});
		}
		return () => {
			matrixClient.removeAllListeners();
		};
	}, [matrixClient]);

	return roomName ? (
		<section
			className={classnames(
				'flex flex-col w-full h-screen',
				'text-light-fg dark:text-dark-fg'
			)}
		>
			<ChatHeader roomName={roomName} />
			<article
				className={classnames(
					'mr-0.5 flex-1 flex flex-col-reverse',
					'scrollbar-thin',
					'scrollbar-thumb-canvas-overlay scrollbar-thumb-rounded-full',
					'scrollbar-track-transparent'
				)}
			>
				{messages
					.filter((event) => event.type === 'm.room.message')
					.map((msg, i, messages) => (
						<Message
							key={`${msg.event_id}-${i}`}
							sender={msg.sender}
							prevSender={i > 0 ? messages[i - 1].sender : undefined}
							content={msg.content}
							isLastMessage={i === messages.length - 1}
							timestamp={msg.origin_server_ts}
						/>
					))
					.reverse()}
			</article>
			<ChatFooter />
		</section>
	) : (
		<EmptyState />
	);
}
