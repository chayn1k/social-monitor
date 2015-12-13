import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import styles from './Post.css';
import withStyles from '../../decorators/withStyles';

import Icon from '../Icon';


@withStyles(styles)
class Post extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired
    };

    renderMedia(medias) {
        if (!(medias && medias.length)) return null;

        const items = medias.map(media => (
            <img key={media.mediaId} src={media.mediaUrl} alt="" className="post__media-item" />
        ));
        return <div className="post__media">{items}</div>;
    }

    renderUser() {
        const post = this.props.post;
        return (
            <cite className="post__user">
                <a href={post.userLink} rel="author" className="post__user-link" title={post.userFullName || post.userName}>
                    <img src={post.userPic} alt={post.userFullName || post.userName} className="post__user-pic" />
                    {post.userFullName ? <span className="post__user-full-name">{post.userFullName}</span> : ''}
                    <span className="post__user-name">@{post.userName}</span>
                </a>
                <time dateTime={moment(post.createdAt).format()} className="post__time" title={moment(post.createdAt).format('LLLL')}>
                    {post.createdFromNow}
                </time>
            </cite>
        );
    }

    render() {
        const post = this.props.post;

        return (
            <div className={classNames('post', { [`post_type_${post.type}`]: post.type })}>
                <article>
                    <header className="post__header">
                        <div className="post__header-inner">
                            {this.renderUser()}

                            <a href={post.link} className="post__source-link">
                                <Icon name={post.type} className={classNames('post__source', {
                                    [`post__source_type_${post.type}`]: post.type
                                })} />
                            </a>
                        </div>
                    </header>

                    <blockquote cite={post.link} className="post__content">
                        <div className="post__text" dangerouslySetInnerHTML={{__html: post.text}}></div>
                        {this.renderMedia(this.props.post.medias)}
                    </blockquote>

                </article>
            </div>
        );
    }

}

export default Post;
