import React, { Component } from 'react';
import AppStore from '../../stores/AppStore';
import StreamStore from '../../stores/StreamStore';
import PostsList from '../PostsList';
import NoPosts from '../NoPosts';


function getStateFromStores() {
    return {
        columns: AppStore.getState().columns,
        posts: StreamStore.getAll()
    };
}


class Stream extends Component {

    constructor(props) {
        super(props);

        AppStore.addListener(this._onChange.bind(this));
        StreamStore.addListener(this._onChange.bind(this));
    }

    state = getStateFromStores();

    _onChange() {
        this.setState(getStateFromStores());
    }

    render() {
        return ( this.state.posts && Object.keys(this.state.posts).length ?
            <PostsList posts={this.state.posts} columns={this.state.columns} /> :
            <NoPosts message="Don't load posts."/>
        );
    }

}

export default Stream;
