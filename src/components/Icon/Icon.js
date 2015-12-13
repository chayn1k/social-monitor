import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Icon.css';
import withStyles from '../../decorators/withStyles';


@withStyles(styles)
class Icon extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        size: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const className = classNames('icon', `icon-${this.props.name}`, {
            [`icon_size_${this.props.size}`]: this.props.size,
            [this.props.className]: this.props.className
        });

        const useTag = `<use xlink:href='#${this.props.name}-icon' />`;
        const icon = (
            <svg className="icon__cnt" dangerouslySetInnerHTML={{__html: useTag }}>
            </svg>
        );

        return (
            <div className={className}>{icon}</div>
        );
    }

}

export default Icon;
