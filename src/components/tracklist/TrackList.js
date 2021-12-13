import React from "react";
import './TrackList.css';
import { Track } from "../track/Track";

export class TrackList extends React.Component {
    render() {
        return (
            <div class="TrackList">
                {this.props.tracks.map(
                    (track) => {
                        return <Track key={track.id} track={track} /> 
                    }
                )}
            </div>
        );
    }
}