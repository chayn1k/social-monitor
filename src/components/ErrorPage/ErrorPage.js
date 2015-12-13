import React, { PropTypes, Component } from 'react';
import styles from './ErrorPage.css';
import withStyles from '../../decorators/withStyles';


@withStyles(styles)
class ErrorPage extends Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    render() {
        const title = 'Error';
        this.context.onSetTitle(title);
        return (
            <div className="error-page">
                <h1>{title}</h1>
                <p>Sorry, an critical error occurred on this page.</p>
            </div>
        );
    }

}

export default ErrorPage;
