import {instagram as Instagram} from 'instagram-node';
import querystring from 'querystring';
import conf from '../config';

const instagram = new Instagram();
instagram.use(conf.instagram);

class serviceInstagram {
    get(query = '') {
        return new Promise( (resolve, reject) => {
            let _query = querystring.unescape(query).replace(/(\.|-)/g, '').replace(/(\s)/g, '').replace('#', '');

            instagram.tag_media_recent(_query, (err, medias, pagination, limit) => {
                if (err) {
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
        const createdAt = new Date(parseInt(post.created_time) * 1000);
        return {
            avatar: post.user.profile_picture,
            userNick: post.user.username,
            imageUrl: post.images.standard_resolution.url,
            postLink: post.link,
            createdAt: createdAt,
            alt: post.caption && post.caption.text || '',
            type: 'instagram'
        };
    }
}

export default serviceInstagram;
