import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './SearchForm.css';
import withStyles from '../../decorators/withStyles';

import { SearchBar } from '../SearchBar';

import AppStore from '../../stores/AppStore';
import AppAction from '../../actions/AppActions';

const baseClass = 'search-form';


@withStyles(styles)
class SearchForm extends Component {

    static propTypes = {
        searchParam: PropTypes.string,
        action: PropTypes.string,
        placeholder: PropTypes.string,
        size: PropTypes.string,
        autoFocus: PropTypes.bool
    };

    static defaultProps = {
        searchParam: 'query',
        placeholder: 'tagname',
        size: 'normal',
        autoFocus: false
    };

    constructor(props) {
        super(props);

        this._appSubscription = AppStore.addListener(this._onAppStoreChange);
    }

    state = {
        oldValue: AppStore.get('query') || '',
        value: AppStore.get('query') || ''
    };

    componentWillUnmount() {
        this._appSubscription.remove();
    }


    // events handlers
    _onAppStoreChange = () => {
        return this.setState({
            oldValue: AppStore.get('query'),
            value: AppStore.get('query')
        });
    };

    _onSearchBarChange = (value, resolve) => {
        this.setState({ value: value });
        resolve([]);
    };

    _onSubmit = (ev) => {
        ev.preventDefault();

        if ((this.state.value || this.state.value === '') && this.state.value !== this.state.oldValue) {
            AppAction.changeQuery(this.state.value);
        }
    };


    render() {
        const { size } = this.props;
        const className = classNames(baseClass, `${baseClass}_size_${size}`);
        const childrenProps = {
            inputName: this.props.searchParam,
            placeholder: this.props.placeholder,
            autoFocus: this.props.autoFocus,
            onChange: this._onSearchBarChange,
            value: this.state.value
        };


        return (
            <form className={className} method="get" action={this.props.action} onSubmit={this._onSubmit}>
                <div className="search-form__inner">
                    <SearchBar {...childrenProps} />
                </div>
            </form>
        );
    }

}

export default SearchForm;
