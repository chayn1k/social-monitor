import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';

import SearchForm from '../SearchForm';
import { Link } from 'react-router';


@withStyles(styles)
class Header extends Component {

    render() {
        return (
            <div className="header">
                <div className="header__container">
                    <Link className="header__brand" to="/">
                        <img className="header__brand-img" src={require('./logo-small.png')} width="38" height="38" alt="Social Monitor" />
                        <span className="header__brand-txt">Social Monitor</span>
                    </Link>

                    <div className="header__nav">
                        <SearchForm size="normal" />
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;
