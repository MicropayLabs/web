import React, { useState, useEffect } from 'react';
import Message from './Message';
import { useMatrixClient } from '@lib/matrix';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import EmptyState from '../empty-state/EmptyState';
import classnames from 'classnames';
import { Room } from 'matrix-js-sdk';

export default function ChatWindow() {
	const matrixClient = useMatrixClient();
	const [events, setEvents] = useState([]);
	const [room, setRoom] = useState<Room>();

	useEffect(() => {
		if (matrixClient) {
			const rooms = matrixClient.getRooms();
			console.log('rooms:', rooms);
			if (rooms.length > 0) {
				setRoom(rooms[0]);
				setEvents(rooms[0].timeline.map((matrixEvent) => matrixEvent.event));
				matrixClient.on('Room.timeline', (matrixEvent, _room, _toStartOfTimeline) => {
					if (matrixEvent.getType() === 'm.room.message') {
						setEvents((oldEvents) => [...oldEvents, matrixEvent.event]);
					}
				});
			}
		}
		return () => {
			matrixClient.removeAllListeners();
		};
	}, [matrixClient]);

	return matrixClient?.getRooms().length > 0 ? (
		<section className={classnames('flex flex-col w-full', 'text-light-fg dark:text-dark-fg')}>
			<ChatHeader room={room} />
			<main className="flex-1 flex flex-col justify-end overflow-y-scroll">
				{events
					.filter((event) => event.type === 'm.room.message')
					.map((event, i, events) => (
						<Message
							key={`${event.event_id}-${i}`}
							sender={event.sender}
							prevSender={i > 0 ? events[i - 1].sender : null}
							content={event.content}
							isLastMessage={i === events.length - 1}
							timestamp={event.origin_server_ts}
						/>
					))}
			</main>
			<ChatFooter />
		</section>
	) : (
		<EmptyState />
	);
}
