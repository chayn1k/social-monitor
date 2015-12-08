import { Router } from 'express';
import Twitter from '../../server/serviceTwitter';
import Instagram from '../../server/serviceInstagram';
import logger from '../../server/logger';


const router = new Router();
const twitter = new Twitter();
const instagram = new Instagram();


router.use(async (err, req, res, next) => {
    if (req.app.get('env') === 'development') {
        logger.error(err);
    }

    res.status(500).send({status: 500, message: 'Internal error'});
    return next(err);
});

router.get('/', async (req, res, next) => {
    try {
        const state = req.session && req.session.state;
        const twParams = {};
        const igParams = {};

        if (state && state.query === req.query.q) {
            twParams.minId = state.tw.minId;
            igParams.minId = state.ig.minId;
        }

        const twitterRes = await twitter.get(req.query.q, twParams);
        const instagramRes = await instagram.get(req.query.q, igParams);

        const result = twitterRes.data.concat(instagramRes.data);
        result.sort((first, second) => {
            return new Date(second.createdAt.valueOf()) - new Date(first.createdAt.valueOf());
        });

        req.session.state = {
            query: req.query.q,
            tw: twitterRes.pagination,
            ig: instagramRes.pagination
        };
        res.status(200).send(result);
    } catch (err) {
        logger.error(err);
        res.status(500).send({status: 500, message: `Internal server error.`});
        return next(err);
    }
});

// @todo: Add method for load older posts

router.get('/twitter', async (req, res, next) => {
    try {
        const result = await twitter.get(req.query.q);
        res.status(200).send(result);
    } catch (err) {
        return next(err);
    }
});

router.get('/instagram', async (req, res, next) => {
    try {
        const result = await instagram.get(req.query.q);
        res.status(200).send(result);
    } catch (err) {
        return next(err);
    }
});

export default router;


