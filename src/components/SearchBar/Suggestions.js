import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';


class Suggestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: -1
        };
    }

    onTouchStart(index) {
        this._timerId = setTimeout(() => {
            this.setState({activeItem: index});
        }, 200);
    }

    onTouchMove() {
        clearTimeout(this._timerId);
        this._touchMoved = true;
        this.setState({activeItem: -1});
    }

    onTouchEnd(suggestion) {
        if (!this._touchMoved) {
            setTimeout(() => {
                this.props.onSelection(suggestion);
            }, 220);
        }

        this._touchMoved = false;
    }

    render() {
        const {highlightedItem, searchTerm, suggestions} = this.props;
        const {activeItem} = this.state;
        return (
            <ul
                className="search-bar-suggestions"
                onMouseLeave={() => this.setState({activeItem: -1})}>
                {suggestions.map((suggestion, index) =>
                    <li
                        className={classNames({
                            highlighted: highlightedItem === index || activeItem === index
                        })}
                        key={index}
                        onClick={() => this.props.onSelection(suggestion)}
                        onMouseEnter={() => this.setState({activeItem: index})}
                        onMouseDown={(ev) => ev.preventDefault()}
                        onTouchStart={() => this.onTouchStart(index)}
                        onTouchMove={() => this.onTouchMove()}
                        onTouchEnd={() => this.onTouchEnd(suggestion)}>
                        <span>
                            {searchTerm}
                            <strong>{suggestion.substr(searchTerm.length)}</strong>
                        </span>
                    </li>
                )}
            </ul>
        );
    }

}

Suggestions.propTypes = {
    highlightedItem: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
    suggestions: PropTypes.array.isRequired,
    onSelection: PropTypes.func
};

Suggestions.defaultProps = {
    highlightedItem: -1,
    searchTerm: '',
    suggestions: []
};

export default Suggestions;
