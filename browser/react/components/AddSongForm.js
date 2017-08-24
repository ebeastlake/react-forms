import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AddSongForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input: "",
			songs: [],
			filter: ""
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		axios.get('/api/songs')
		.then((res) => {
			console.log(res.data);
			this.setState({songs: res.data});
		});
	}

	handleChange(event) {
		const input = event.target.value;
		this.setState({input: input, filter: input})
	}

	handleSubmit(event) {
		event.preventDefault();
		const songLocation = this.state.songs.findIndex(song => {
			return song.name === this.state.input;
		});
		const songId = this.state.songs[songLocation].id;
		this.props.addSong(songId);
		this.setState({input: ''});
	}

	render() {
		const songs = this.state.songs.filter(song => {
			let filter = new RegExp(`^${this.state.filter}`, 'i');
			return song.name.match(filter);
		});

		return (
			<div className="well">
			    <form className="form-horizontal" noValidate name="songSelect" onSubmit={this.handleSubmit}>
			      <fieldset>
			        <legend>Add to Playlist</legend>
			        <div className="form-group">
			          <label htmlFor="song" className="col-xs-2 control-label">Song</label>
			          <div className="col-xs-10">
			          	<input
            				onChange = {this.handleChange}
            				className="form-control"
            				placeholder="Enter song name"
          				/>
			            {/*<select className="form-control" name="song">
			            
			            			           
			            			              <option value="SONGID_GOES_HERE">song name</option>
			            			              <option value="SONGID_GOES_HERE">another song name</option>
			            			            </select>*/}
			          </div>
			        </div>
			        <div className="form-group">
			          <div className="col-xs-10 col-xs-offset-2">
			            <button type="submit" className="btn btn-success">Add Song</button>
			          </div>
			        </div>
			        <div className="list-group">
			          {
			            songs.map(song => {
			              return (
			                <div className="list-group-item" key={song.id}>
			                  <span>{song.name}</span>
			                </div>
			              );
			            })
			          }
			        </div>
	
			      </fieldset>
			    </form>
			  </div>
			);
	}
}