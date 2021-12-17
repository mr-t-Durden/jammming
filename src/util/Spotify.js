const CLIENT_ID = 'a6c71c4f23bb492f84fa798dd059b1b8';
const REDIRECT_URI = 'http://localhost:3000/'
// const REDIRECT_URI = 'http://jammmingff.surge.sh/'

var accessToken = '';
var expirationTime;

const Spotify = {

    parseURL(url) {
        var hashParams = {};
        var e;
        var r = /([^&;=]+)=?([^&;]*)/g;
        while ( e = r.exec(url.split('#')[1])) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    },

    getAccessToken() {
        const url = window.location.href;
        if(accessToken) {
            return accessToken;
        } else if(url.includes('access_token')) {
            var hashParams = this.parseURL(url);
            accessToken = hashParams.access_token;
            expirationTime = Number(hashParams.expires_in);
            console.log(`${expirationTime} vs ${expirationTime+2}`);
            window.setTimeout(() => accessToken = '', expirationTime*1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
    },

    search(searchTerm) {
        console.log('Start Search-Request')
        const accessToken = Spotify.getAccessToken();
        console.log('curr URL: ' + window.location );
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
        if(response.ok){
            console.log('Request succeds!')
            return response.json();  
        }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            console.log(jsonResponse);
            return jsonResponse.tracks.items.map((track)=>(
                {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            ));
        })
    },

    savePlaylist(playlistName, trackUriArray) {
        if( !playlistName || !trackUriArray ) {
            return;
        }
        var accessToken = Spotify.getAccessToken();
        var headers = { Authorization: `Bearer ${accessToken}` };
        var userID = '';

        return fetch('https://api.spotify.com/v1/me', {headers: headers}).then( (response) => {
            if(response.ok) {
                return response.json();
            }
        }).then( (jsonResponse) => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name: playlistName })
            }).then( (response) => {
                if(response.ok) {
                    return response.json();
                }
            }, networkError => {
                console.log(networkError.message);
            } ).then( (jsonResponse) => {
                var playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: trackUriArray })
                }).then( (response) => {
                    if(response.ok) {
                        return response.json();
                    }
                } ).then( (jsonResponse) => {
                    playlistID = jsonResponse.id;
                })
            })
        })

        // var playlistID;
        // fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        //     method: 'POST',
        //     headers: headers,
        //     body: {
        //         name: `${playlistName}`
        //     }
        // }).then( (response) => {
        //     if(response.ok) {
        //         return response.json();
        //     }
        // }, networkError => {
        //     console.log(networkError.message);
        // } ).then( (jsonResponse) => {
        //     playlistID = jsonResponse.id;
        // })

        // fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        //     method: 'POST',
        //     headers: headers,
        //     body: {
        //         uris: `${trackUriArray}`
        //     }
        // }).then( (response) => {
        //     if(response.ok) {
        //         return response.json();
        //     }
        // } ).then( (jsonResponse) => {
        //     playlistID = jsonResponse.id;
        // })

    }
};

export default Spotify;