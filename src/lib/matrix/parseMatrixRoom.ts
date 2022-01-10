/**
 * Converts a name like !micropay:example.com to micropay
 */
export const parseMatrixRoom = (name: string) => {
	const [roomName, _domainName] = name.split(':');
	return roomName.replace('!', '');
};
