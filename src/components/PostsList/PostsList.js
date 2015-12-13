import React, { Component, PropTypes } from 'react';
import styles from './PostsList.css';
import withStyles from '../../decorators/withStyles';

import Post from '../Post';


@withStyles(styles)
class PostsList extends Component {

    static propTypes = {
        posts: PropTypes.array,
        columns: PropTypes.number
    };

    static defaultProps = {
        columns: 3
    };

    renderChildren() {
        // Build list items of single tweet components using map
        const columns = [];
        const col = this.props.columns;

        this.props.posts.map((item, index) => {
            const colId = index % col;
            if (!columns[colId]) columns[colId] = [];
            columns[colId].push(
                <Post key={`col-${colId}__${item.id}`} post={item} className="post-list__item" />
            );
        });

        const gutter = 2;
        const colWidth = Math.floor((100 - gutter * (col - 1)) / col);
        const colStyle = {
            width: colWidth + '%'
        };

        return columns.map((items, index) => (
            <div key={`col-${index}`} className="posts-list__column" style={colStyle}>
                {items}
            </div>
        ));
    }

    render() {
        return (
            <section className="posts-list">{this.renderChildren()}</section>
        );
    }

}

export default PostsList;
