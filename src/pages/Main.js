import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Reminders, AddReminder, EditReminder, ViewReminder} from './Export';

export class Main extends React.Component {
	render() {
		return(
			<main>
				<Switch>
					<Route exact path="/" component={Reminders} />
					<Route path="/view/:id" component={ViewReminder} />
					<Route path="/add" component={AddReminder} />
					<Route path="/edit/:id" component={EditReminder} />
					<Route path="/" component={Error404} />
				</Switch>
			</main>
		)
	}
}

const Error404 = () => {
	return(
		<div style={styles.divDecoration}>
			<h1 className="display-1 text-center" style={styles.textDecoration}>Error 404</h1>
		</div>
	);
}

const styles = {
	textDecoration : {
		color: 'crimson',
	},
	divDecoration : {
		margin: '10px',
		borderRadius: '10px',
	}
}
