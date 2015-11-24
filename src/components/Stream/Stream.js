import React, { Component } from 'react';
import AppStore from '../../stores/AppStore';
import StreamStore from '../../stores/StreamStore';
import PostsList from '../PostsList';
import NoPosts from '../NoPosts';

import StreamAction from '../../actions/StreamActions';


function getStateFromStores() {
    const appState = AppStore.getState();
    return {
        columns: appState.columns,
        updateInterval: appState.updateInterval,
        posts: StreamStore.getAll()
    };
}


class Stream extends Component {

    constructor(props) {
        super(props);

        AppStore.addListener(this._onChange);
        StreamStore.addListener(this._onChange);
    }

    state = getStateFromStores();

    componentDidMount() {
        this.intervalID = setInterval(StreamAction.updateMessagesTime, this.state.updateInterval);
    }

    componentWillUnmount() {
        AppStore.removeListener(this._onChange);
        StreamStore.removeListener(this._onChange);
        if (this.intervalID) clearInterval(this.intervalID);
    }

    _onChange = () => {
        return this.setState(getStateFromStores());
    };

    render() {
        return (this.state.posts && Object.keys(this.state.posts).length ?
            <PostsList posts={this.state.posts} columns={this.state.columns} /> :
            <NoPosts message="Don't load posts."/>
        );
    }

}

export default Stream;
