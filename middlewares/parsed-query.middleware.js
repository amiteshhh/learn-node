export default (req, res, next) => {
    req.parsedQuery = req.query;
    // console.log(req.parsedQuery)
    next();
}