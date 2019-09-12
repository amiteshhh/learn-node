export default (req, res, next) => {
    if (req.method === 'POST' || req.method === 'POST') {
        req.body.lastModifiedDate = new Date();
        // req.body.$setOnInsert = {
        //     createdAt: new Date()
        // };
    }
    next();
}