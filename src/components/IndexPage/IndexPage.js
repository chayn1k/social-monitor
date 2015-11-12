import React, { PropTypes, Component } from 'react';
import styles from './IndexPage.css';
import withStyles from '../../decorators/withStyles';
import PostsList from '../PostsList';

@withStyles(styles)
class IndexPage extends Component {

    static propTypes = {
        posts: PropTypes.array
    };

    render() {
        return (
            <div className="page page_index">
                <PostsList posts={this.props.posts}/>
            </div>
        );
    }

}

export default IndexPage;
