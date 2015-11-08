import { Router } from 'express';
import Twitter from '../../utils/serviceTwitter';


const router = new Router();
const twitter = new Twitter();

router.get('/twitter', async (req, res, next) => {
    try {
        const result = await twitter.get(req.query.q);
        res.status(200).send(result);
    } catch (err) {
        return next(err);
    }
});


export default router;


