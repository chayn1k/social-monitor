import moment from 'moment';
import {instagram as Instagram} from 'instagram-node';
import querystring from 'querystring';
import conf from '../config';
import logger from './logger';

const instagram = new Instagram();
instagram.use(conf.instagram);
const count = 10;

class serviceInstagram {
    get(query = '') {
        return new Promise( (resolve, reject) => {
            const _query = querystring.unescape(query).replace(/(\.|-)/g, '').replace(/(\s)/g, '').replace('#', '');

            if (!_query) return resolve([]);

            instagram.tag_media_recent(_query, { count: count }, (err, res) => {
                if (err) {
                    logger.error(err);
                    return reject(err);
                }

                if (res && (res.length > 0)) {
                    return resolve(res.slice(0, count).map(serviceInstagram.normalize));
                }

                return resolve([]);
            });
        });
    }

    static normalize(post) {
        return {
            type: 'instagram',

            id: post.id,
            text: post.caption && post.caption.text || '',
            link: post.link,
            createdAt: moment.unix(post.created_time).toJSON(),
            medias: [{
                mediaId: post.id,
                mediaUrl: post.images.standard_resolution.url,
                mediaLink: post.link,
                mediaType: post.type
            }],

            userId: post.user.id,
            userName: post.user.username,
            userFullName: post.user.full_name,
            userPic: post.user.profile_picture,
            userLink: `https://instagram.com/${post.user.username}`
        };
    }
}

export default serviceInstagram;
