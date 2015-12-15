import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import classNames from 'classnames';
import styles from './Alert.css';
import withStyles from '../../decorators/withStyles';

import Icon from '../Icon';

const TYPES = [
    'danger',
    'error', // alias for danger
    'info',
    'primary',
    'success',
    'warning'
];
const ALIGNMENTS = [
    'left',
    'center',
    'right'
];


@withStyles(styles)
class Alert extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        type: PropTypes.oneOf(TYPES).isRequired,
        align: PropTypes.oneOf(ALIGNMENTS),
        className: PropTypes.string,
        closeLabel: PropTypes.string,
        onClick: PropTypes.func,
        onDismiss: PropTypes.func
    };

    static defaultProps = {
        closeLabel: 'Close'
    };


    renderDismissBtn() {
        return (
            <button
                type="button"
                title={this.props.closeLabel}
                className="alert__close"
                onClick={this.props.onDismiss}
                aria-hidden="true"
                tabIndex="-1"
            >
                <Icon className="alert__close-icon" name="close" />
            </button>
        );
    }

    render() {
        const className = classNames(
            'alert',
            {
                'alert_dismissible': this.props.onDismiss,
                'alert_clickable': this.props.onClick,
                [`alert_${this.props.align}`]: this.props.align
            },
            [`alert_${this.props.type}`],
            this.props.className
        );

        return (
            <div className={className} onClick={this.props.onClick || emptyFunction}>
                {this.props.children}
                {this.props.onDismiss ? this.renderDismissBtn() : null}
            </div>
        );
    }

}

export default Alert;
