import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Songs from './Songs'

export default class Playlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPlaylist: {}
        }
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



    render() {
        const playlist = this.state.currentPlaylist
        return (
            <div>
                <h3>{playlist.name}</h3>
                <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
                {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
                <hr />
            </div>
        )
    }
}
