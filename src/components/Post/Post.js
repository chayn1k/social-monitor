import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import withStyles from '../../decorators/withStyles';
import styles from './Post.css';
import Icon from '../Icon';

@withStyles(styles)
class Post extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired
    };

    getMedia(medias) {
        if (!(medias && medias.length)) return null;

        const items = medias.map(media => <img key={media.mediaId} src={media.mediaUrl} alt="" className="post__media-item" />);
        return <div className="post__media">{items}</div>;
    }

    getUser() {
        const post = this.props.post;
        return (
            <cite className="post__user">
                <a href={post.userLink} rel="author" className="post__user-link" title={post.userFullName || post.userName}>
                    <img src={post.userPic} alt={post.userFullName || post.userName} className="post__user-pic" />
                    {post.userFullName ? <span className="post__user-full-name">{post.userFullName}</span> : ''}
                    <span className="post__user-name">@{post.userName}</span>
                </a>
                <time dateTime={moment(post.createdAt).format()} className="post__time" title={moment(post.createdAt).format('LLLL')}>
                    {moment(post.createdAt).format('DD MMM YYYY H:mm:ss')}
                </time>
            </cite>
        );
    }

    render() {
        const post = this.props.post;

        return (
            <li className={'post' + (post.type ? ' post_type_' + post.type : '')}>
                <article>
                    <header className="post__header"><div className="post__header-inner">
                        {this.getUser()}

                        <a href={post.link} className="post__source-link">
                            <Icon name={post.type} className={'post__source post__source_type_' + post.type} />
                        </a>
                    </div></header>

                    <blockquote cite={post.link} className="post__content">
                        <div className="post__text" dangerouslySetInnerHTML={{__html: post.text}}></div>
                        {this.getMedia(this.props.post.medias)}
                    </blockquote>

                </article>
            </li>
        );
    }

}

export default Post;
