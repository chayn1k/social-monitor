import React, { Component, PropTypes } from 'react';
import { SearchBar } from '../SearchBar';
import styles from './SearchForm.css';
import withStyles from '../../decorators/withStyles';

const baseClass = 'search-form';


@withStyles(styles)
class SearchForm extends Component {

    static propTypes = {
        autoFocus: PropTypes.bool,
        size: PropTypes.string,
        placeholder: PropTypes.string
    };

    static defaultProps = {
        size: 'normal'
    };

    _onSearchBarChange = (input, resolve) => {
        // @todo: to handle
        resolve([]);
    };

    _onSubmit = () => {
        // @todo: send event to store
    };

    render() {
        const { size } = this.props;
        const className = [baseClass];

        if (size) className.push(`${baseClass}_size_${size}`);

        return (
            <div className={className.join(' ')}>
                <div className="search-form__inner">
                    <SearchBar placeholder="#tagname" autoFocus onChange={this._onSearchBarChange} onSubmit={this._onSubmit} />
                </div>
            </div>
        );
    }

}

export default SearchForm;
