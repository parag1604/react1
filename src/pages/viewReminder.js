import React from 'react';
import axios from 'axios';

import {Sidebar} from './sidebar';

import './authenticated.css';

export class ViewReminder extends React.Component {
	// eslint-disable-next-line
	constructor(props) {
		super(props)
		this.state = {
			reminder: {}
		}
	}
	componentWillMount() {
		document.title = document.title+' View'
	}
	componentDidMount() {
		axios.get('http://127.0.0.1:5000/reminder/'+this.props.match.params.id)
		.then((res)=>{
			this.setState({reminder: res.data})
		})
		.catch((err)=>{
			if(err)
				console.log(err)
			alert("Something went wrong...")
		})
	}
	render() {
		return(
			<div className="container">
				<Sidebar />	
				<div className="page-header">
					<h1 className="display-3 custom-text">View</h1>
				</div>
				<hr />
				<div className="detailed-reminder">
					<h2><strong>{this.state.reminder.heading}</strong> - <span className="text-muted"><em>{this.state.reminder.todoFor}</em></span></h2>
					<hr />
					<p>
						{this.state.reminder.mainContent}
					</p>
				</div>
			</div>
		)
	}
}