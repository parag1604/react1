import React from 'react';

import {Link} from 'react-router-dom';

export class Sidebar extends React.Component {
	// eslint-disable-next-line
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<div className="sidebar-wrapper text-center">
				<Link to="/">
				<div className={this.props.page === 'dashboard' ? "menu-item active" : "menu-item"}>
					<i className="fas fa-tachometer-alt fa-2x" style={{margin: '2px'}}></i>
					<div className="small">Home</div>
				</div></Link>
				<Link to="/add">
				<div className={this.props.page === 'add' ? "menu-item active" : "menu-item"}>
					<i className="fas fa-plus-square fa-2x" style={{margin: '2px'}}></i>
					<div className="small">Add</div>
				</div></Link>
			</div>
		)
	}
}