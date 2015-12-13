import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './ColumnsSwitcher.css';
import withStyles from '../../decorators/withStyles';

import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';

const col = ['one', 'two', 'three'];
const colMap = {
    one: 1,
    two: 2,
    three: 3
};


@withStyles(styles)
class ColumnsSwitcher extends Component {

    state = {
        current: AppStore.get('columns')
    };

    _onClick(ev, count) {
        ev.preventDefault();
        ev.stopPropagation();

        this.setState({ current: count });
        AppActions.columnsCountChange(count);
    }


    renderButtons() {
        return col.map(item => {
            const icon = require(`./img/${item}-col.png`);
            const props = {
                className: classNames('col-switcher__item', {
                    'col-switcher__item_active': colMap[item] === this.state.current
                }),
                style: {
                    backgroundImage: `url(${icon})`
                },
                onClick: ev => this._onClick(ev, colMap[item])
            };

            return <span key={`switcher-${item}`} {...props} />;
        });
    }

    render() {
        return (
            <div className="col-switcher">
                <div className="col-switcher__container">
                    {this.renderButtons()}
                </div>
            </div>
        );
    }

}

export default ColumnsSwitcher;
