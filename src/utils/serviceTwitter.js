import moment from 'moment';
import Twitter from 'twit';
import TwitterText from 'twitter-text';
import conf from '../config';

const twitter = new Twitter(conf.twitter);
const count = 10;

class serviceTwitter {
    get(query = '') {
        return new Promise( (resolve, reject) => {
            if (!query) return resolve([]);

            twitter.get('search/tweets', { q: query, count: count }, (err, res) => {
                if (err) {
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
        return {
            avatar: post.user.profile_image_url,
            userId: post.user.id,
            userName: post.user.name,
            userNick: post.user.screen_name,
            postLink: 'https://twitter.com/' + post.user.screen_name,
            createdAt: moment(new Date(post.created_at)),
            text: TwitterText.autoLink(TwitterText.htmlEscape(post.text)),
            type: 'twitter'
        };
    }
}

export default serviceTwitter;
