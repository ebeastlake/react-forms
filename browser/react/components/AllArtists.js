import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {

  constructor() {
    super();
    this.state = {
      artists: [],
      filter: ""
    };
    this.handleChangeFilter=this.handleChangeFilter.bind(this);
  }

  handleChangeFilter (event) {
    this.setState({filter: event.target.value})
  }

  componentDidMount() {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({ artists }));
  }

  render() {
    const artists = this.state.artists.filter(artist=>{
      // let artistLowerCase = artist.name.toLowerCase()  
      //let filterLowerCase = this.state.filter.toLowerCase()
      let filter = new RegExp(`^${this.state.filter}`, 'i')
      return artist.name.match(filter)
    });



    return (
      <div>
        <form className="form-group" style={{ marginTop: '20px' }}>
          <input
            onChange = {this.handleChangeFilter}
            className="form-control"
            placeholder="Enter artist name"
          />
        </form>

        <h3>Artists</h3>


        <div className="list-group">
          {
            artists.map(artist => {
              return (
                <div className="list-group-item" key={artist.id}>
                  <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
