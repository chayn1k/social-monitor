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
                    <Link className="footer__link" to="/">GitHub</Link>
                    <span className="footer__spacer">·</span>
                    <Link className="footer__link" to="/404">Not Found</Link>
                </div>
            </div>
        );
    }

}

export default Footer;
