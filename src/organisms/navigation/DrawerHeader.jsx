import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { twemojify } from '@lib/util/twemojify';

import initMatrix from '@lib/matrix/initMatrix';
import cons from '@lib/matrix/state/cons';
import {
	openPublicRooms,
	openCreateRoom,
	openInviteUser,
} from '@lib/matrix/action/navigation';
import {
	createSpaceShortcut,
	deleteSpaceShortcut,
} from '@lib/matrix/action/room';

import Text from '../../atoms/text/Text';
import Header, { TitleWrapper } from '../../atoms/header/Header';
import IconButton from '../../atoms/button/IconButton';
import ContextMenu, {
	MenuItem,
	MenuHeader,
} from '../../atoms/context-menu/ContextMenu';

const PlusIC = '/res/ic/outlined/plus.svg';
const HashPlusIC = '/res/ic/outlined/hash-plus.svg';
const HashSearchIC = '/res/ic/outlined/hash-search.svg';
const PinIC = '/res/ic/outlined/pin.svg';
const PinFilledIC = '/res/ic/filled/pin.svg';

function DrawerHeader({ selectedTab, spaceId }) {
	const [, forceUpdate] = useState({});
	const mx = initMatrix.matrixClient;
	const tabName =
		selectedTab !== cons.tabs.DIRECTS ? 'Home' : 'Direct messages';

	const room = mx.getRoom(spaceId);
	const spaceName =
		selectedTab === cons.tabs.DIRECTS ? null : room?.name || null;

	return (
		<Header>
			<TitleWrapper>
				<Text variant="s1" weight="medium" primary>
					{twemojify(spaceName) || tabName}
				</Text>
			</TitleWrapper>
			{spaceName && (
				<IconButton
					size="extra-small"
					variant="surface"
					tooltip={
						initMatrix.roomList.spaceShortcut.has(spaceId)
							? 'Unpin'
							: 'Pin to sidebar'
					}
					src={
						initMatrix.roomList.spaceShortcut.has(spaceId) ? PinFilledIC : PinIC
					}
					onClick={() => {
						if (initMatrix.roomList.spaceShortcut.has(spaceId))
							deleteSpaceShortcut(spaceId);
						else createSpaceShortcut(spaceId);
						forceUpdate({});
					}}
				/>
			)}
			{selectedTab === cons.tabs.DIRECTS && (
				<IconButton
					onClick={() => openInviteUser()}
					tooltip="Start DM"
					src={PlusIC}
					size="normal"
				/>
			)}
			{selectedTab !== cons.tabs.DIRECTS && !spaceName && (
				<>
					<ContextMenu
						content={(hideMenu) => (
							<>
								<MenuHeader>Add room</MenuHeader>
								<MenuItem
									iconSrc={HashPlusIC}
									onClick={() => {
										hideMenu();
										openCreateRoom();
									}}
								>
									Create new room
								</MenuItem>
								<MenuItem
									iconSrc={HashSearchIC}
									onClick={() => {
										hideMenu();
										openPublicRooms();
									}}
								>
									Add public room
								</MenuItem>
							</>
						)}
						render={(toggleMenu) => (
							<IconButton
								onClick={toggleMenu}
								tooltip="Add room"
								src={PlusIC}
								size="normal"
							/>
						)}
					/>
				</>
			)}
			{/* <IconButton onClick={() => ''} tooltip="Menu" src={VerticalMenuIC} size="normal" /> */}
		</Header>
	);
}

DrawerHeader.defaultProps = {
	spaceId: null,
};
DrawerHeader.propTypes = {
	selectedTab: PropTypes.string.isRequired,
	spaceId: PropTypes.string,
};

export default DrawerHeader;
