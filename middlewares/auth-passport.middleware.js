
export default (req, res, next) => {
    if (!req.session.passport) {
        return res.status(401).json({
            "code": 401,
            "message": 'Session is missing. Kindly login and try again!!'
        });
    }
    next();

}