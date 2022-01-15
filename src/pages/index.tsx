import React from 'react';

import { isAuthenticated } from '@lib/matrix/state/auth';

import Auth from '@layouts/auth';
// import Client from '@layouts/client';

function App() {
	return <Auth />;
	// return isAuthenticated() ? <Client /> : <Auth />;
}

export default App;
