import moment from 'moment';
import {instagram as Instagram} from 'instagram-node';
import querystring from 'querystring';
import conf from '../config';
import logger from './logger';

const instagram = new Instagram();
instagram.use(conf.instagram);
const count = 10;


// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
class serviceInstagram {
    get(query = '', params = {}) {
        return new Promise((resolve, reject) => {
            const { minId, maxId } = params;
            let result = { data: [], pagination: { minId, maxId } };
            const _query = querystring.unescape(query).replace(/(\.|-)/g, '').replace(/(\s)/g, '').replace('#', '');

            if (!_query) return resolve(result);

            const _params = { count: count };
            if (minId) _params.min_tag_id = minId;
            if (maxId) _params.max_tag_id = maxId;

            instagram.tag_media_recent(_query, _params, (err, res, pagination) => {
                if (err) {
                    logger.error(err);
                    return reject(err);
                }

                if (res && (res.length > 0)) {
                    result = {
                        data: res.slice(0, count).map(serviceInstagram.normalize),
                        pagination: {
                            minId: pagination.min_tag_id || minId,
                            maxId: pagination.next_max_tag_id || maxId
                        }
                    };
                }

                return resolve(result);
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
