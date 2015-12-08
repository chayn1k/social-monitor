import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';

import AppRoute from '../AppRoute';


@withContext
@withStyles(styles)
class App extends Component {

    static propTypes = {
        params: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired,
        error: PropTypes.object
    };


    render() {
        return !this.props.error ? (
            <div className="app-container">
                <AppRoute {...this.props} />
                {this.props.children}
            </div>
        ) : this.props.children;
    }

}

export default App;
