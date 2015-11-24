import React, { Component } from 'react';
import styles from './IndexPage.css';
import withStyles from '../../decorators/withStyles';
import SearchForm from '../SearchForm';

@withStyles(styles)
class IndexPage extends Component {

    render() {
        const childrenProps = {
            size: 'big'
        };

        return (
            <div className="index-page">
                <SearchForm {...childrenProps} />
            </div>
        );
    }

}

export default IndexPage;
