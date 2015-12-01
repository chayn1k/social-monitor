import React, { Component } from 'react';
import styles from './IndexPage.css';
import withStyles from '../../decorators/withStyles';
import { page as Api } from '../../constants/Api';

import SearchForm from '../SearchForm';


@withStyles(styles)
class IndexPage extends Component {

    render() {
        const searchFormProps = {
            size: 'big',
            action: Api.STREAM,
            searchParam: 'tagname',
            autoFocus: true
        };

        return (
            <div className="index-page">
                <SearchForm {...searchFormProps} />
            </div>
        );
    }

}

export default IndexPage;
