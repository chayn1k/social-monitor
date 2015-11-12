import React, { Component, PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Icon.css';


@withStyles(styles)
class Icon extends Component {

    static propTypes: {
        size: PropTypes.string,
        name: PropTypes.string.isRequired,
        className: PropTypes.string
    };

    render() {
        const size = this.props.size ? ' icon_size_' + this.props.size : '';
        const className = this.props.className ? ' ' + this.props.className : '';
        const _class = 'icon icon-' + this.props.name + size + className;

        const name = '#' + this.props.name + '-icon';
        const useTag = '<use xlink:href=' + name + ' />';
        const icon = (
            <svg className="icon__cnt" dangerouslySetInnerHTML={{__html: useTag }}>
            </svg>
        );
        return (
            <div className={_class}>{icon}</div>
        );
    }

}

export default Icon;
