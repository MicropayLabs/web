import React from 'react';
//import './Welcome.scss';

import Text from '../../atoms/text/Text';

function Welcome() {
	return (
		<div className="app-welcome flex--center">
			<div>
				<img
					className="app-welcome__logo noselect"
					src={'/res/svg/cinny.svg'}
					alt="Cinny logo"
				/>
				<Text
					className="app-welcome__heading"
					variant="h1"
					weight="medium"
					primary
				>
					Welcome to Micropay
				</Text>
				<Text className="app-welcome__subheading" variant="s1">
					Scalable infrastructure for decentralized organizations
				</Text>
			</div>
		</div>
	);
}

export default Welcome;
