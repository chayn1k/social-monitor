import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './ColumnsSwitcher.css';
import withStyles from '../../decorators/withStyles';

import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';


@withStyles(styles)
class ColumnsSwitcher extends Component {

    state = {
        current: AppStore.get('columns')
    };


    getButtons() {
        return [1, 2, 3].map(item => {
            const icon = require(`./col_${item}.png`);
            const props = {
                className: classNames('col-switcher__item', {
                    'col-switcher__item_active': item === this.state.current
                }),
                style: {
                    backgroundImage: `url(${icon})`
                },
                onClick: ev => this._onClick(ev, item)
            };

            return <span key={`switcher-${item}`} {...props} />;
        });
    }


    _onClick(ev, count) {
        ev.preventDefault();
        ev.stopPropagation();

        this.setState({ current: count });
        AppActions.changeColumnsCount(count);
    }


    render() {
        return (
            <div className="col-switcher">
                <div className="col-switcher__container">
                    {this.getButtons()}
                </div>
            </div>
        );
    }

}

export default ColumnsSwitcher;
