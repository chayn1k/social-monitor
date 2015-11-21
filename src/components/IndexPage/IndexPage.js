import React, { PropTypes, Component } from 'react';
import styles from './IndexPage.css';
import withStyles from '../../decorators/withStyles';
import Stream from '../Stream';

@withStyles(styles)
class IndexPage extends Component {

    render() {
        return (
            <div className="page page_index">
                <Stream />
            </div>
        );
    }

}

export default IndexPage;
