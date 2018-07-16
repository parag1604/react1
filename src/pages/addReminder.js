import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import {Sidebar} from './sidebar';

import './authenticated.css';

export class AddReminder extends React.Component {
	// eslint-disable-next-line
	constructor(props) {
		super(props)
		this.state = {
			newName: '',
			newTitle: '',
			newBody: '',
			redirect: false,
		}
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}
	componentWillMount() {
		document.title = document.title+' Add'
	}
	handleButtonClick() {
		if(this.state.newName === '') {
			alert("Please fill your name");
		} else if(this.state.newTitle === '') {
			alert("Please enter a title for the reminder");
		} else if(this.state.newBody === '') {
			alert("Please enter content for the reminder");
		} else {
			axios.post('http://127.0.0.1:5000/reminder', {
				newTitle: this.state.newTitle,
				newName: this.state.newName,
				newBody: this.state.newBody,
			})
			.then((res)=>{
				// eslint-disable-next-line
				if(res.data.status == 0) {
					this.setState({redirect: true});
				} else {
					alert("Something went wrong...");
				}
			})
			.catch((err) => {
				if(err) 
					console.log(err);
				alert("Something went wrong...");
			})
		}
	}
	render() {
		if(this.state.redirect) {
			return(
				<Redirect to="/" />
			)
		}
		return(
			<div className="container">
				<Sidebar page={'add'} />
				<div className="page-header">
					<h1 className="display-3 custom-text">Add</h1>
				</div>
				<hr />
				<div className="detailed-reminder">
					<form>
						<div className="form-group">
							<label htmlFor="newName">Enter Your Name</label>
							<input type="text" className="form-control" id="newName" placeholder="Your Name" required autoFocus
							onChange={(e)=>{
								e.preventDefault();
								this.setState({newName: e.target.value});
							}} />
						</div>
						<div className="form-group">
							<label htmlFor="newTitle">Enter Title</label>
							<input type="text" className="form-control" id="newTitle" placeholder="Reminder title" required
							onChange={(e)=>{
								e.preventDefault();
								this.setState({newTitle: e.target.value});
							}} />
						</div>
						<div className="form-group">
							<label htmlFor="newBody">Enter content</label>
							<textarea type="text" className="form-control" id="newBody" placeholder="Reminder Body" required
							onChange={(e)=>{
								e.preventDefault();
								this.setState({newBody: e.target.value});
							}} />
						</div>
						<button className="btn btn-primary"
						onClick={(e)=>{e.preventDefault();this.handleButtonClick();}}>Add Reminder</button>
					</form>
				</div>
			</div>
		)
	}
}