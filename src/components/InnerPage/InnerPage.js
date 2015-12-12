import React, { Component, PropTypes } from 'react';
import styles from './InnerPage.css';
import withStyles from '../../decorators/withStyles';

import Header from '../Header';
import Footer from '../Footer';


@withStyles(styles)
class InnerPage extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired
    };

    render() {
        return (
            <section className="page-container">
                <Header />
                <div className="inner-page">
                    {this.props.children}
                </div>
                <Footer />
            </section>
        );
    }

}

export default InnerPage;
