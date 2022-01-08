import Member from './Member';
import Message from './Message';

export default function MessageHandler({
	sender,
	prev,
	type,
	content,
	isLastMessage,
	timestamp,
}) {
	const messageHandlers: Map<string, any> = new Map([
		[
			'm.room.message',
			Message({
				sender,
				prev,
				content,
				isLastMessage,
				timestamp,
			}),
		],
		['m.room.member', Member({ sender, content })],
	]);
	return (
		messageHandlers.get(type) ||
		Message({
			sender,
			prev,
			content,
			isLastMessage,
			timestamp,
		})
	);
}
