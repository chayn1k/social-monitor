import React, { Component, PropTypes } from 'react';
import AppStore from '../../stores/AppStore';
import StreamStore from '../../stores/StreamStore';
import StreamAction from '../../actions/StreamActions';

import PostsList from '../PostsList';


function _getInitState() {
    const appState = AppStore.getState();
    return {
        columns: appState.columns,
        updateInterval: appState.updateInterval,
        posts: StreamStore.getMessages()
    };
}


class Stream extends Component {

    static propTypes = {
        params: PropTypes.object.isRequired,
        location: PropTypes.object
    };

    constructor(props) {
        super(props);

        this._appSubscription = AppStore.addListener(this._onChangeAppStore);
        this._streamSubscription = StreamStore.addListener(this._onChangeStreamStore);
    }

    state = _getInitState();

    componentDidMount() {
        const tag = this.props.params.tagname || this.props.location.query.tagname || '';

        StreamAction.receiveMessages(tag);
        this.intervalID = setInterval(StreamAction.updateMessagesTime, this.state.updateInterval);
    }

    componentWillUnmount() {
        this._appSubscription.remove();
        this._streamSubscription.remove();
        if (this.intervalID) clearInterval(this.intervalID);
    }


    _onChangeAppStore = () => {
        return this.setState({
            columns: AppStore.get('columns'),
            updateInterval: AppStore.get('updateInterval')
        });
    };

    _onChangeStreamStore = () => {
        return this.setState({
            posts: StreamStore.getMessages()
        });
    };


    render() {
        return (
            <PostsList posts={this.state.posts} columns={this.state.columns} />
        );
    }

}


export default Stream;
