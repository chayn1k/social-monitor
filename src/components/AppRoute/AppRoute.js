import React, { Component, PropTypes } from 'react';

import AppStore from '../../stores/AppStore';
import AppAction from '../../actions/AppActions';


class AppRoute extends Component {

    static propTypes = {
        params: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    };

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this._appSubscription = AppStore.addListener(this._onAppStoreChange);
    }

    state = {
        query: AppStore.get('query') || ''
    };

    componentWillMount() {
        this.setState({
            query: AppStore.get('query')
        });
    }

    componentDidMount() {
        const query = this.props.params.tagname || this.props.location.query.tagname;
        if (query) {
            this._routeHandler(query);
        }
    }

    componentWillUpdate(newProps, newState) {
        if (this.props.params.tagname !== newProps.params.tagname ||
            this.props.location.query.tagname !== newProps.location.query.tagname
        ) {
            this._routeHandler(newProps.params.tagname || newProps.location.query.tagname);
        }

        if (this.state.query !== newState.query) {
            this._routeHandler(newState.query);
        }
    }

    componentWillUnmount() {
        this._appSubscription.remove();
    }


    _routeHandler(newValue = '') {
        const curValue = this.state.value;
        const curPath = this.props.location && this.props.location.pathname || '/';
        const history = this.props.history;
        let path = '/';


        this.setState({ query: newValue });
        this.context.onSetTitle(`#${newValue} - Social Monitor`);

        if (newValue) {
            path = `/tag/${newValue}`;
        }

        if (path !== curPath) {
            history.push(path);
        }

        if (newValue && newValue !== curValue) {
            AppAction.queryChange(newValue);
        }
    }


    _onAppStoreChange = () => {
        return this.setState({
            query: AppStore.get('query')
        });
    };


    render() {
        return (<div></div>);
    }

}

export default AppRoute;
