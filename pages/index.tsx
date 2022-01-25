import React from 'react';

import { isAuthenticated } from '@matrix/state/auth';

import Auth from '@layouts/auth';
import Client from '@layouts/client';

function App() {
	return isAuthenticated() ? <Client /> : <Auth />;
}

export default App;
