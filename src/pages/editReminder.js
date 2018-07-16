import React from 'react';
import axios from 'axios';

import {Sidebar} from './sidebar';

import './authenticated.css';

export class EditReminder extends React.Component {
	// eslint-disable-next-line
	constructor(props) {
		super(props)
		this.state = {
			reminder : {}
		}
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}
	componentWillMount() {
		document.title = document.title+' Edit'
	}
	componentDidMount() {
		axios.get('http://127.0.0.1:5000/reminder/'+this.props.match.params.id)
		.then((res)=>{
			this.setState({reminder: res.data})
		})
		.catch((err)=>{
			if(err)
				console.log(err)
			alert("Something went horribly wrong...")
		})
	}
	handleButtonClick() {
		axios.put('http://127.0.0.1:5000/reminder/'+this.props.match.params.id, {
			updatedTitle: this.state.reminder.heading,
			updatedBody: this.state.reminder.mainContent
		})
		.then((res)=>{
			if(res.data.status == '0') {
				window.location.reload();
			} else {
				alert("Something went wrong...");
			}
		})
		.catch((err)=>{
			if(err)
				console.log(err)
			alert("Something went horribly wrong...")
		})
	}
	render() {
		return(
			<div className="container">
				<Sidebar />
				<div className="page-header">
					<h1 className="display-3 custom-text">Edit</h1>
				</div>
				<hr />
				<div className="detailed-reminder">
					<form>
						<div className="form-group">
							<label htmlFor="editedTitle">Enter Title</label>
							<input type="text" className="form-control" id="editedTitle" placeholder="Reminder title" required autoFocus
							value={this.state.reminder.heading}
							onChange={(e)=>{
								e.preventDefault();
								var remCopy = this.state.reminder;
								remCopy.heading = e.target.value;
								this.setState({reminder: remCopy});
							}} />
						</div>
						<div className="form-group">
							<label htmlFor="editedBody">Enter content</label>
							<textarea type="text" className="form-control" id="editedBody" placeholder="Reminder Body" required
							value={this.state.reminder.mainContent}
							onChange={(e)=>{
								e.preventDefault();
								var remCopy = this.state.reminder;
								remCopy.mainContent = e.target.value;
								this.setState({reminder: remCopy});
							}} />
						</div>
						<button onClick={
							(e) => {
								e.preventDefault();
								this.handleButtonClick();
							}
						} className="btn btn-primary">Update Reminder</button>
					</form>
				</div>
			</div>
		)
	}
}