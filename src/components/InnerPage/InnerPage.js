import React, { Component, PropTypes } from 'react';
import styles from './InnerPage.css';
import withStyles from '../../decorators/withStyles';

import Sticky from 'react-sticky';
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
                <Sticky className="header-wrap" stickyClass="header-wrap_position_sticky" topOffset={90}>
                    <Header />
                </Sticky>
                <div className="inner-page">
                    {this.props.children}
                </div>
                <Footer />
            </section>
        );
    }

}

export default InnerPage;
