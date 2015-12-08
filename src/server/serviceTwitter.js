import moment from 'moment';
import Twitter from 'twit';
import TwitterText from 'twitter-text';
import conf from '../config';
import logger from './logger';

const twitter = new Twitter(conf.twitter);
const count = 10;


// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
class serviceTwitter {
    get(query = '', params = {}) {
        return new Promise((resolve, reject) => {
            const { minId, maxId } = params;
            let result = { data: [], pagination: { minId, maxId } };
            if (!query) return resolve(result);

            const _params = { q: query, count: count };
            if (minId) _params.since_id = minId;
            if (maxId) _params.max_id = maxId;

            twitter.get('search/tweets', _params, (err, res) => {
                if (err) {
                    logger.error(err);
                    return reject(err);
                }

                if (res) {
                    const _minId = /since_id=(\d+)/i.exec(res.search_metadata.refresh_url);
                    const _maxId = /max_id=(\d+)/i.exec(res.search_metadata.next_results);
                    result = {
                        data: res.statuses.map(serviceTwitter.normalize),
                        pagination: {
                            minId: _minId && _minId[1] || minId,
                            maxId: _maxId && _maxId[1] || maxId
                        }
                    };
                }

                return resolve(result);
            });
        });
    }

    static normalize(post) {
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

        return entity;
    }
}

export default serviceTwitter;
