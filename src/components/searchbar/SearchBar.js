import React from "react";
import './SearchBar.css';
import PropTypes from 'prop-types';

const searchTermKey = "searchTerm";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.setState({searchTerm: ''});
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
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

    handleKeyDown(e) {
        if(e.key === 'Enter') {
            this.search();
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <input 
                    placeholder="Enter A Song, Album, or Artist" 
                    onChange={this.handleTermChange}
                    id="searchInput" 
                    onKeyDown={this.handleKeyDown}   
                />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
};