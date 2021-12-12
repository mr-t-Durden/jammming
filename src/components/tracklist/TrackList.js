import React from "react";
import './TrackList.css';
import { Track } from "../track/Track";

const demoTrackList = [
    {
        name: 'Song1',
        artist: 'Singer1',
        album: 'Album1'
    },
    {
        name: 'Song2',
        artist: 'Singer2',
        album: 'Album2'
    },
    {
        name: 'Song3',
        artist: 'Singer3',
        album: 'Album3'
    },
];

export class TrackList extends React.Component {
    render() {
        return (
            <div class="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
            </div>
        );
    }
}