import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './SearchBar.css';
import withStyles from '../../decorators/withStyles';

import Suggestions from './Suggestions';

const KEY_CODES = {
    enter: 13,
    up: 38,
    down: 40
};


@withStyles(styles)
class SearchBar extends Component {

    constructor(props) {
        super(props);

        if (!props.onChange) {
            throw Error('You must supply a callback to `onChange`.');
        }

        this._initialState = {
            highlightedItem: -1,
            searchTerm: '',
            suggestions: [],
            value: ''
        };

        this.state = Object.assign({}, this._initialState);
        if (this.props.value) this.state.value = this.props.value;
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            this.refs.input.focus();
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value
        });
    }

    onChange(ev) {
        clearTimeout(this._timerId);
        let input = ev.target.value; // eslint-disable-line prefer-const

        if (!input) {
            this.setState(this._initialState);
            return new Promise(resolve => {
                this.props.onChange(input, resolve);
            });
        }

        this.setState({value: input});
        this._timerId = setTimeout(() => {
            this.autosuggest();
        }, this.props.debounceDelay);
    }

    onKeyDown(ev) {
        ev.preventDefault();
        let {highlightedItem: item} = this.state;
        const {suggestions} = this.state;
        const lastItem = suggestions.length - 1;

        if (ev.which === KEY_CODES.up) {
            item = (item <= 0) ? lastItem : item - 1;
        } else {
            item = (item === lastItem) ? 0 : item + 1;
        }

        this.setState({
            highlightedItem: item,
            value: suggestions[item]
        });
    }

    onSelection(suggestion) {
        this.setState({value: suggestion});
        this.search(suggestion);
    }

    onSubmit(ev) {
        ev.preventDefault();
        const input = this.normalizeInput();
        if (!input) return;
        this.search(input);
    }

    normalizeInput() {
        return this.state.value.toLowerCase().trim();
    }

    autosuggest() {
        const searchTerm = this.normalizeInput();
        if (!searchTerm) return;
        new Promise((resolve) => {
            this.props.onChange(searchTerm, resolve);
        }).then((suggestions) => {
            if (!this.state.value) return;
            this.setState({
                highlightedItem: -1,
                searchTerm,
                suggestions
            });
        });
    }

    search(value) {
        clearTimeout(this._timerId);
        this.refs.input.blur();
        const {highlightedItem, suggestions} = this._initialState;
        this.setState({highlightedItem, suggestions});
        this.props.onSubmit(value);
    }


    render() {
        return (
            <div className="search-bar">
                <div className={classNames(
                  'search-bar__field',
                  {'search-bar__field_focused': this.state.isFocused}
                )}>
                    <input
                        className="search-bar__input"
                        name={this.props.inputName}
                        type="text"
                        maxLength="100"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        ref="input"
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        onChange={this.onChange.bind(this)}
                        onKeyDown={(ev) => {
                            if ((ev.which === KEY_CODES.up || ev.which === KEY_CODES.down)
                                && this.state.suggestions
                            ) {
                                this.onKeyDown(ev);
                            }

                            if (ev.which === KEY_CODES.enter && this.props.onSubmit) {
                                this.onSubmit(ev);
                            }
                        }} // jscs:ignore requirePaddingNewLinesAfterBlocks
                        onBlur={() => this.setState({isFocused: false, suggestions: []})}
                        onFocus={() => this.setState({isFocused: true})}/>
                    { this.state.value &&
                        <span
                            className="search-bar__icon search-bar__cancel"
                            onClick={() => this.setState(this._initialState)}>
                        </span>
                    }
                    <input
                        className="search-bar__icon search-bar__submit"
                        type="submit"
                        onClick={this.props.onSubmit && this.onSubmit.bind(this)}/>
                </div>
                { this.state.suggestions.length > 0 &&
                    <Suggestions
                        searchTerm={this.state.searchTerm}
                        suggestions={this.state.suggestions}
                        highlightedItem={this.state.highlightedItem}
                        onSelection={this.onSelection.bind(this)}/>
                }
            </div>
        );
    }

}


SearchBar.propTypes = {
    autoFocus: PropTypes.bool,
    debounceDelay: PropTypes.number,
    inputName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string
};

SearchBar.defaultProps = {
    autoFocus: true,
    debounceDelay: 100,
    inputName: 'query'
};

export default SearchBar;
