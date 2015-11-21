import React, { Component, PropTypes } from 'react';

class NoPosts extends Component {

    static propTypes = {
        message: PropTypes.string.isRequired
    };

    render() {
        return (
            <div>
                <h1>No content.</h1>
                <p>{this.props.message}</p>
            </div>
        );
    }

}

export default NoPosts;
