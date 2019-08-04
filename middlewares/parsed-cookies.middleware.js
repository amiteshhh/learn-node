export default (req, res, next) => {
    req.parsedCookies = req.cookies;
    next();
}