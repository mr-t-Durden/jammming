const CLIENT_ID = 'a6c71c4f23bb492f84fa798dd059b1b8';
const REDIRECT_URI = 'http://localhost:3000/'

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
            expirationTime = hashParams.expires_in;
            window.setTimeout(() => accessToken = '', expirationTime*1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
    },

    search(searchTerm) {
        console.log('Start Search-Request')
        const accessToken = this.getAccessToken();
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
    }
};

export default Spotify;