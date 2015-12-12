import React, { Component } from 'react';
import styles from './Footer.css';
import withStyles from '../../decorators/withStyles';

import { Link } from 'react-router';
import Icon from '../Icon';


@withStyles(styles)
class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <div className="footer__container">
                    <span className="footer__text">© Social Monitor</span>
                    <span className="footer__spacer">·</span>
                    <Link className="footer__link" to="/">Main Page</Link>
                    <span className="footer__spacer">·</span>
                    <a className="footer__link" href="https://github.com/chayn1k/social-monitor">
                        <Icon className="footer__external-icon" name="external-link" />
                        Source on GitHub
                    </a>
                    <span className="footer__spacer">·</span>
                    <a className="footer__link" href="http://social-mon.herokuapp.com/">
                        <Icon className="footer__external-icon" name="external-link" />
                        Demo on Heroku
                    </a>
                </div>
            </div>
        );
    }

}

export default Footer;
