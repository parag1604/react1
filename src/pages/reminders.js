import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {Sidebar} from './sidebar';

import './authenticated.css';

export class Reminders extends React.Component {
	// eslint-disable-next-line
	constructor(props) {
		super(props)
		this.state = {
			reminders : [],
		}
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}
	componentWillMount() {
		document.title = document.title+' Dashboard'
	}
	componentDidMount() {
		axios.get('http://127.0.0.1:5000/reminders')
		.then((res)=>{
			this.setState({reminders: res.data})
		})
		.catch((err)=>{
			if(err)
				console.log(err)
			alert("Something went wrong...")
		})
	}
	handleButtonClick(id) {
		if(window.confirm("Are you sure, you want to delete this reminder?")) {
			axios.delete('http://127.0.0.1:5000/reminder/'+id)
			.then((res)=>{
				// eslint-disable-next-line
				if(res.data.status == 0) {
					window.location.reload();
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
		return(
			<div className="container">
				<Sidebar page={'dashboard'}/>
				<div className="page-header">
					<h1 className="display-3 custom-text">Home</h1>
				</div>
				<hr />
				{
					this.state.reminders.length === 0 ? <p className="text-muted small"><em>No reminders set, yet...</em></p> : ""
				}
				{
					this.state.reminders.map((item, index) => {
						return(
							<div className="abstract-reminder-items row" key={index}>
									<div className="col-md-9">
										<h3><span className="text-muted">{(index+1)+'. '}</span>
										<Link to={'/view/'+item._id}><strong>{item.heading}</strong></Link></h3>
										<p className="text-muted">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											Author: <em><strong>{item.todoFor}</strong></em>
										</p>
									</div>
								<div className="col-md-3 text-center">
									<Link to={'/edit/'+item._id} style={{display: 'inline'}}>
										<i className="far fa-edit fa-2x item-icon" style={{marginLeft: '15px', marginRight: '15px'}}></i>
									</Link>
									<div style={{display: 'inline'}} onClick={(e)=>{e.preventDefault();this.handleButtonClick(item._id)}}>
										<i id="delete-icon" className="far fa-trash-alt fa-2x item-icon" style={{marginLeft: '15px', marginRight: '15px'}}></i>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}
}