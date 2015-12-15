import React, { Component, PropTypes } from 'react';
import AppStore from '../../stores/AppStore';
import StreamStore from '../../stores/StreamStore';
import StreamAction from '../../actions/StreamActions';

import PostsList from '../PostsList';
import ColumnsSwitcher from '../ColumnsSwitcher';
import Alert from '../Alert';


function _getInitState() {
    const appState = AppStore.getState();
    return {
        query: appState.query,
        columns: appState.columns,
        updateInterval: appState.updateInterval,
        updateStreamInterval: appState.updateStreamInterval,
        posts: StreamStore.getMessages()
    };
}


class Stream extends Component {

    static propTypes = {
        params: PropTypes.object.isRequired,
        location: PropTypes.object,
        context: PropTypes.object
    };

    constructor(props) {
        super(props);

        this._appSubscription = AppStore.addListener(this._onChangeAppStore);
        this._streamSubscription = StreamStore.addListener(this._onChangeStreamStore);
    }

    state = _getInitState();

    componentDidMount() {
        if (this.state.query) {
            StreamAction.receiveMessages(this.state.query);
            this.intervalMsgUpdateID = setInterval(() => StreamAction.receiveMessages(this.state.query), this.state.updateStreamInterval);
        }

        this.intervalMsgTimeID = setInterval(StreamAction.updateMessagesTime, this.state.updateInterval);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.query !== nextState.query) {
            if (this.intervalMsgUpdateID) clearInterval(this.intervalMsgUpdateID);
            StreamAction.receiveMessages(nextState.query);
            this.intervalMsgUpdateID = setInterval(() => StreamAction.receiveMessages(nextState.query), this.state.updateStreamInterval);
        }

        this._setTitle(nextState);
    }

    componentWillUnmount() {
        this._appSubscription.remove();
        this._streamSubscription.remove();
        if (this.intervalMsgTimeID) clearInterval(this.intervalMsgTimeID);
        if (this.intervalMsgUpdateID) clearInterval(this.intervalMsgUpdateID);
    }


    _onChangeAppStore = () => {
        const appState = AppStore.getState();
        return this.setState({
            query: appState.query,
            columns: appState.columns,
            updateInterval: appState.updateInterval,
            updateStreamInterval: appState.updateStreamInterval
        });
    };

    _onChangeStreamStore = () => {
        return this.setState({
            posts: StreamStore.getMessages()
        });
    };

    _setTitle(state) {
        if (state.posts.hasNew) {
            this.props.context.onSetTitle(`(${state.posts.hasNew}) #${state.query} — Social Monitor`);
        } else {
            this.props.context.onSetTitle(`#${state.query} — Social Monitor`);
        }
    }

    _showNewMessages = (ev) => {
        ev.preventDefault();
        StreamAction.showNewMessages();
    };


    render() {
        if (this.state.posts.hasNew) {
            return (
                <div>
                    <ColumnsSwitcher />
                    <Alert type="info" align="center" onClick={this._showNewMessages} style={{fontWeight: 'bold', fontSize: '1.4em'}}>
                        {`${this.state.posts.hasNew} new posts`}
                    </Alert>
                    <PostsList posts={this.state.posts} columns={this.state.columns} />
                </div>
            );
        }

        return (
            <div>
                <ColumnsSwitcher />
                <PostsList posts={this.state.posts} columns={this.state.columns} />
            </div>
        );
    }

}


export default Stream;
