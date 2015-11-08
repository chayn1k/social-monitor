import React, { PropTypes, Component } from 'react';
import styles from './IndexPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class IndexPage extends Component {

    render() {
        return (
            <div className="IndexPage-container">
                <h1 className="IndexPage">
                    Hello, world!
                </h1>
            </div>
        );
    }

}

export default IndexPage;
