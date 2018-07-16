import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {Main} from './pages/Export';

export default class App extends React.Component {
	// eslint-disable-next-line
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<Router>
				<Main />
			</Router>
		)
	}
}
