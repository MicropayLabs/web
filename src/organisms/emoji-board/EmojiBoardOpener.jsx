import React, { useEffect, useRef } from 'react';

import cons from '@lib/matrix/state/cons';
import navigation from '@lib/matrix/state/navigation';

import ContextMenu from '../../atoms/context-menu/ContextMenu';
import EmojiBoard from './EmojiBoard';

let requestCallback = null;
let isEmojiBoardVisible = false;
function EmojiBoardOpener() {
	const openerRef = useRef(null);

	function openEmojiBoard(cords, requestEmojiCallback) {
		if (requestCallback !== null || isEmojiBoardVisible) {
			requestCallback = null;
			if (cords.detail === 0) openerRef.current.click();
			return;
		}

		openerRef.current.style.transform = `translate(${cords.x}px, ${cords.y}px)`;
		requestCallback = requestEmojiCallback;
		openerRef.current.click();
	}

	function afterEmojiBoardToggle(isVisible) {
		isEmojiBoardVisible = isVisible;
		if (!isVisible) {
			setTimeout(() => {
				if (!isEmojiBoardVisible) requestCallback = null;
			}, 500);
		}
	}

	function addEmoji(emoji) {
		requestCallback(emoji);
	}

	useEffect(() => {
		navigation.on(cons.events.navigation.EMOJIBOARD_OPENED, openEmojiBoard);
		return () => {
			navigation.removeListener(
				cons.events.navigation.EMOJIBOARD_OPENED,
				openEmojiBoard
			);
		};
	}, []);

	return (
		<ContextMenu
			content={<EmojiBoard onSelect={addEmoji} />}
			afterToggle={afterEmojiBoardToggle}
			render={(toggleMenu) => (
				<input
					ref={openerRef}
					onClick={toggleMenu}
					type="button"
					style={{
						width: '32px',
						height: '32px',
						backgroundColor: 'transparent',
						position: 'absolute',
						top: 0,
						left: 0,
						padding: 0,
						border: 'none',
						visibility: 'hidden',
					}}
				/>
			)}
		/>
	);
}

export default EmojiBoardOpener;
