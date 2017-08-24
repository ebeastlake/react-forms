import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewPlaylist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playlistName: "",
            isDirty: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event) {
        this.setState({ playlistName: event.target.value, isDirty: true })
        console.log('handleChangeState', this.state.playlistName)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addPlaylist(this.state.playlistName);
        this.setState({playlistName: '', isDirty: false})
    }

    render() {
        let buttonStatus = 'disabled';
        let alertStatus = ''
        const maxLength = 16;
        const trimmedLength = this.state.playlistName.trim().length;
        if (trimmedLength > 0 && trimmedLength <= maxLength) {
            buttonStatus = '';
        }
        if (buttonStatus === '' || this.state.isDirty === false) {
            alertStatus = 'hidden'
        }

        return (
            <div className="well">
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <fieldset>
                        <legend>New Playlist</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Name</label>
                            <div className="col-xs-10">
                                <input value={this.state.playlistName} onChange={this.handleChange} className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button type="submit" className={`btn btn-success ${buttonStatus}`}>Create Playlist</button>
                            </div>
                        </div>
                        <div className={`alert alert-warning ${alertStatus}`}>Please enter a name</div>
                    </fieldset>
                </form>
            </div>
        )
    }
}
