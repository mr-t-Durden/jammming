import React from "react";
import './SearchBar.css';

const searchTermKey = "searchTerm";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.setState({searchTerm: ''});
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem(searchTermKey)) {
            var searchtermBeforeRedirect = sessionStorage.getItem(searchTermKey);
            document.getElementById("searchInput").value = searchtermBeforeRedirect;
            this.setState({
                searchTerm: searchtermBeforeRedirect
            });
        }
    }

    search() {
        sessionStorage.setItem(searchTermKey, document.getElementById("searchInput").value)
        this.props.onSearch(this.state.searchTerm);
    }

    handleTermChange(e) {
        this.setState({
           searchTerm: e.target.value
        });
    }

    render() {
        return (
            <div className="SearchBar">
                <input 
                    placeholder="Enter A Song, Album, or Artist" 
                    onChange={this.handleTermChange}
                    id="searchInput"    
                />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

