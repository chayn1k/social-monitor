import moment from 'moment';
import {instagram as Instagram} from 'instagram-node';
import querystring from 'querystring';
import conf from '../config';
import logger from './logger';

const instagram = new Instagram();
instagram.use(conf.instagram);

class serviceInstagram {
    get(query = '') {
        return new Promise( (resolve, reject) => {
            let _query = querystring.unescape(query).replace(/(\.|-)/g, '').replace(/(\s)/g, '').replace('#', '');

            if (!_query) return resolve([]);

            instagram.tag_media_recent(_query, (err, medias, pagination, limit) => {
                if (err) {
                    logger.error(err);
                    return reject(err);
                }

                if (medias && (medias.length > 0)) {
                    return resolve(medias.slice(0, 5).map(serviceInstagram.normalize));
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
            createdAt: moment(post.createdAt).toJSON(),
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
