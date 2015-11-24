import moment from 'moment';
import Twitter from 'twit';
import TwitterText from 'twitter-text';
import conf from '../config';
import logger from './logger';

const twitter = new Twitter(conf.twitter);
const count = 10;

class serviceTwitter {
    get(query = '') {
        return new Promise((resolve, reject) => {
            if (!query) return resolve([]);

            twitter.get('search/tweets', { q: query, count: count }, (err, res) => {
                if (err) {
                    logger.error(err);
                    return reject(err);
                }

                if (res) {
                    return resolve(res.statuses.map(serviceTwitter.normalize));
                }

                return resolve([]);
            });
        });
    }

    static normalize(post) {
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        const entity = {
            type: 'twitter',

            id: post.id_str,
            text: TwitterText.autoLink(TwitterText.htmlEscape(post.text)),
            link: `https://twitter.com/${post.user.screen_name}/status/${post.id_str}`,
            createdAt: moment(new Date(post.created_at)).toJSON(),

            userId: post.user.id,
            userName: post.user.screen_name,
            userFullName: post.user.name,
            userPic: post.user.profile_image_url,
            userLink: `https://twitter.com/${post.user.screen_name}`
        };

        if (post.entities.media) {
            entity.medias = post.entities.media.map(media => ({
                mediaId: media.id_str,
                mediaUrl: media.media_url,
                mediaLink: media.display_url,
                mediaType: media.type === 'photo' ? 'image' : media.type
            }));
        }

        if (post.retweeted_status) {
            const {id_str: rtId, user: { screen_name: rtFromUser }} = post.retweeted_status;
            entity.link = `https://twitter.com/${rtFromUser}/status/${rtId}`;
        }

        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        return entity;
    }
}

export default serviceTwitter;
