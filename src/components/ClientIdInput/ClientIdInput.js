import React from "react";
import './ClientIdInput.css';
import PropTypes from "prop-types";

export class ClientIdInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: ''
        };
        this.handleClientIdSubmit = this.handleClientIdSubmit.bind(this);
        this.handleClientIdChange = this.handleClientIdChange.bind(this);
    }

    handleClientIdSubmit(event) {
        event.preventDefault();
        this.props.onClientIdSubmit(this.state.clientId);
        // console.log(`Saving Client-Id: ${this.state.clientId} in SessionStorage`);
        // sessionStorage.setItem('USER_CLIENT_ID', this.state.clientId);
        // window.location.reload(true);
    }

    handleClientIdChange({target}) {
        this.setState({
            clientId: target.value
        });
    }

    render() {
        return (
            <div className='clientIdInput'>
                <form onSubmit={this.handleClientIdSubmit}>
                    <input
                        type='text' 
                        placeholder="Your Spotify Client-Id" 
                        id="clientIdInput"
                        pattern="[\d\w]{32}"
                        onChange={this.handleClientIdChange}
                    />
                    <input type="submit" value="CONNECT" />
                </form>
            </div>
        )
    }
}

ClientIdInput.propTypes = {
    onClientIdSubmit: PropTypes.func
}
