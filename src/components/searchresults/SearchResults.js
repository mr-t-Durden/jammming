import React from "react";
import './SearchResults.css';
import { TrackList } from "../tracklist/TrackList";

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist tracks={this.props.searchResults}/>
            </div>
        );
    }
}