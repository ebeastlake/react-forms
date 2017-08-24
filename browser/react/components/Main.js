import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist'
import axios from 'axios'
import Playlist from './Playlist'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: []
    }
    this.addPlaylist = this.addPlaylist.bind(this)
  }


  addPlaylist(name) {
    let playlistsCopy = this.state.playlists
    axios.post('/api/playlists', { name: name })
      .then((res) => {
        console.log("res.data from main", res.data) 
        playlistsCopy.push(res.data)
        this.setState({playlists: playlistsCopy})
      })
      .catch(console.log)
  }

  componentDidMount() {
    axios.get('/api/playlists')
      .then((res) => {
        console.log("res.data", res.data)
        this.setState({ playlists: res.data })
      })
      .catch(console.log)
  }
  render() {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={this.state.playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route path='/newplaylist' render={() => <NewPlaylist addPlaylist={this.addPlaylist} />} />
              <Route path= '/playlists/:id' component = {Playlist} />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
      </Router>
    );
  }
}
