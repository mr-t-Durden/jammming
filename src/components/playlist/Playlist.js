import React from "react";
import './Playlist.css';
import { TrackList } from "../tracklist/TrackList";
import PropTypes from "prop-types";

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input
                    value={this.props.playlistName}
                    onChange={this.handleNameChange}
                />
                <TrackList
                    tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                />
                <button className={'Playlist-save'} onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

Playlist.propTypes = {
    playlistName: PropTypes.string.isRequired,
    playlistTracks: PropTypes.array.isRequired, 
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};