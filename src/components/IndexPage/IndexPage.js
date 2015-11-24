import React, { Component } from 'react';
import styles from './IndexPage.css';
import withStyles from '../../decorators/withStyles';
import Stream from '../Stream';

@withStyles(styles)
class IndexPage extends Component {

    render() {
        return (
            <div className="index-page">
                <Stream />
            </div>
        );
    }

}

export default IndexPage;
