import React, { Component } from 'react';
import styles from './Footer.css';
import withStyles from '../../decorators/withStyles';

import { Link } from 'react-router';


@withStyles(styles)
class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <div className="footer__container">
                    <span className="footer__text">© Social Monitor</span>
                    <span className="footer__spacer">·</span>
                    <a className="footer__link" href="https://github.com/chayn1k/social-monitor">Source on GitHub</a>
                    <span className="footer__spacer">·</span>
                    <a className="footer__link" href="http://social-mon.herokuapp.com/">Demo on Heroku</a>
                </div>
            </div>
        );
    }

}

export default Footer;
