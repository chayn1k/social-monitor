import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import { page as Api } from '../../constants/Api';
import RequestStates from '../../constants/RequestStates';
import AppStore from '../../stores/AppStore';

import SearchForm from '../SearchForm';
import { Link } from 'react-router';


@withStyles(styles)
class Header extends Component {

    state = {};

    componentDidMount() {
        this._appSubscription = AppStore.addListener(this._onChangeAppStore);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.reqState !== nextState.reqState;
    }

    componentWillUnmount() {
        this._appSubscription.remove();
    }


    _onChangeAppStore = () => {
        return this.setState({
            reqState: AppStore.get('request')
        });
    };


    render() {
        const reqState = this.state.reqState && this.state.reqState in RequestStates.STATES_START;
        const logoClass = classNames('header__brand-img', {
            'header__brand-img_state_progress': reqState
        });
        const searchFormProps = {
            size: 'normal',
            action: Api.STREAM,
            searchParam: 'tagname'
        };

        return (
            <div className="header">
                <div className="header__container">
                    <Link className="header__brand" to="/">
                        <img className={logoClass} src={require('./logo-small.png')} width="38" height="38" alt="Social Monitor" />
                        <span className="header__brand-txt">Social Monitor</span>
                    </Link>

                    <div className="header__nav">
                        <SearchForm {...searchFormProps} />
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;
