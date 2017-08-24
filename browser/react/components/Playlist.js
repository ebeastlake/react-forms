import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Songs from './Songs'
import AddSongForm from './AddSongForm';

export default class Playlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPlaylist: {}
        }

        this.addSong = this.addSong.bind(this);
    }

    fetchInfo(id) {
        axios.get(`/api/playlists/${id}`)
            .then(res => {
                this.setState({ currentPlaylist: res.data })
            })
    }


    componentDidMount() {
        let id=this.props.match.params.id
        this.fetchInfo(id)
    }

    componentWillReceiveProps(nextProps) {
        let nextId = nextProps.match.params.id
        if (nextId !== this.state.currentPlaylist.id) {
            this.fetchInfo(nextId)
        }
    }

    addSong(songId) {
        const playlistId = this.state.currentPlaylist.id;
        axios.post(`/api/playlists/${playlistId}/songs`, {id: songId})
            .then((res) => {
                console.log("IN ADD SONG!!", res.data)
                let copy = Object.assign({}, this.state.currentPlaylist);
                copy.songs.push(res.data);
                this.setState({currentPlaylist: copy});
            })
            .catch(console.log)
    }

    render() {
        const playlist = this.state.currentPlaylist
        return (
            <div>
                <h3>{playlist.name}</h3>
                <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
                {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
                <hr />
                <AddSongForm addSong={this.addSong}/>
            </div>
        )
    }
}
