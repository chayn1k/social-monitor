import React, { Component, PropTypes } from 'react';
import Post from '../Post';
import withStyles from '../../decorators/withStyles';
import styles from './PostsList.css';

@withStyles(styles)
class PostsList extends Component {

    static propTypes = {
        posts: PropTypes.array,
        columns: PropTypes.number
    };

    static defaultProps = {
        columns: 3
    };

    getChildren() {
        // Build list items of single tweet components using map
        const columns = [];
        const col = this.props.columns;

        this.props.posts.map((item, index) => {
            const colId = index % col;
            if (!columns[colId]) columns[colId] = [];
            columns[colId].push(
                <Post key={item.id} post={item} className="post-list__item" />
            );
        });

        const gutter = 2;
        const colWidth = Math.floor((100 - gutter * (col - 1)) / col);
        const colStyle = {
            width: colWidth + '%'
        };

        return columns.map((items, index) => (
            <div key={'post-list-column-' + index} className="posts-list__column" style={colStyle}>
                {items}
            </div>
        ));
    }

    render() {
        return (
            <section className="posts-list">{this.getChildren()}</section>
        );
    }

}

export default PostsList;
