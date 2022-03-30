import React from 'react';
import './App.css';
import { SearchBar } from '../searchbar/SearchBar';
import { SearchResults } from '../searchresults/SearchResults';
import { Playlist } from '../playlist/Playlist';
import { ClientIdInput } from '../ClientIdInput/ClientIdInput';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    // this.handleClientIdInput = this.handleClientIdInput.bind(this);
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

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }
  
  search(searchTerm) {
    Spotify.search(searchTerm).then((searchResults) => {
      this.setState({searchResults: searchResults});
    });
  }

  setClientId(clientId) {
    console.log(`Saving Client-Id: ${clientId} in SessionStorage`);
    sessionStorage.setItem('USER_CLIENT_ID', clientId);
    Spotify.getAccessToken();
    // window.location.reload(true);
  }

  // async handleClientIdInput({target}) {
  //   if( target.value ) {
  //     await this.setState({clientId: target.value});
  //     console.log(`current State clientId: ${this.state.clientId}`);
  //     Spotify.clientId = this.state.clientId;
  //     console.log(`clientId-Property of Spotify object set to ${Spotify.clientId}`);
      
  //     const blockedArea = document.getElementById('block-access-area');
  //     blockedArea.removeEventListener('click', this.missingClientIdAlert);
  //     blockedArea.style.display = 'none';
  //   }
  // }

  checkClientIdSet() {
    return sessionStorage.getItem('USER_CLIENT_ID') ? true : false;
  }

  missingClientIdAlert() {
    alert('Enter Client ID of your Spotify-Registration!')
  }

  componentDidMount() {
    const blockedArea = document.getElementById('block-access-area');
    const clientIdInput = document.getElementsByClassName('clientIdInput')[0]
    
    if( !this.checkClientIdSet() ) {
      blockedArea.style.display = 'block';
      blockedArea.addEventListener('click', this.missingClientIdAlert);
      clientIdInput.style.display = 'block'
    } 
  }

  render() {
    return (
      <div>
        <ClientIdInput onClientIdSubmit={this.setClientId} />
        <div id='block-access-area'></div>
        <div id='webpage'>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults 
                searchResults={this.state.searchResults} 
                onAdd={this.addTrack}
              />
              <Playlist 
                playlistName={this.state.playlistName} 
                playlistTracks={this.state.playlistTracks} 
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
