import React, { Component, PropTypes } from 'react';
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
        value: AppStore.get('query') || ''
    };

    componentWillUnmount() {
        this._appSubscription.remove();
    }


    // events handlers
    _onAppStoreChange = () => {
        const query = AppStore.get('query');
        if (query !== this.state.query) {
            return this.setState({value: query});
        }
    };

    _onSearchBarChange = (value, resolve) => {
        this.setState({ value: value });
        resolve([]);
    };

    _onSubmit = (ev) => {
        ev.preventDefault();
        if (this.state.value || this.state.value === '') {
            AppAction.changeQuery(this.state.value);
        }
    };


    render() {
        const { size } = this.props;
        const className = [baseClass];

        if (size) className.push(`${baseClass}_size_${size}`);

        const childrenProps = {
            inputName: this.props.searchParam,
            placeholder: this.props.placeholder,
            autoFocus: this.props.autoFocus,
            onChange: this._onSearchBarChange
        };

        if (this.state.value || this.state.value === '') childrenProps.value = this.state.value;

        return (
            <form className={className.join(' ')} method="get" action={this.props.action} onSubmit={this._onSubmit}>
                <div className="search-form__inner">
                    <SearchBar {...childrenProps} />
                </div>
            </form>
        );
    }

}

export default SearchForm;
