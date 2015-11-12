import { Router } from 'express';
import Twitter from '../../utils/serviceTwitter';
import Instagram from '../../utils/serviceInstagram';
import logger from '../../utils/logger';


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
        Promise.all([
            twitter.get(req.query.q),
            instagram.get(req.query.q)
        ]).then(resultArr => {
            const result = Array.prototype.concat.apply([], resultArr);
            result.sort((first, second) => {
                return new Date(second.createdAt.valueOf()) - new Date(first.createdAt.valueOf());
            });

            res.status(200).send(result);
        }).catch(err => {
            logger.error(err);
            res.status(500).send({status: 500, message: `Internal server error.`});
        });
    } catch (err) {
        return next(err);
    }
});

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


