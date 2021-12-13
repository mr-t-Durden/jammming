import React from 'react';
import './App.css';
import { SearchBar } from '../searchbar/SearchBar';
import { SearchResults } from '../searchresults/SearchResults';
import { Playlist } from '../playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
            name: 'Song1',
            artist: 'Singer1',
            album: 'Album1',
            id: 1
        },
        {
            name: 'Song2',
            artist: 'Singer2',
            album: 'Album2',
            id: 2
        },
        {
            name: 'Song3',
            artist: 'Singer3',
            album: 'Album3',
            id: 3
        },
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          name: 'Somewhere I belong',
          artist: 'Linkin Park',
          album: 'Meteora',
          id: 10
      },
      {
          name: 'Open your Eyes',
          artist: 'Guano Apes',
          album: '-',
          id: 20
      },
      {
          name: 'The Only',
          artist: 'Static X',
          album: '-',
          id: 30
      },
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({
      playlistTracks: [...this.state.playlistTracks, track]
    });
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter((currtrack) => currtrack.id !== track.id)
    }); 
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
