
export default (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect('/401')
    // if (!req.session.passport) {
    //     return res.status(401).json({
    //         "code": 401,
    //         "message": 'Session is missing. Kindly login and try again!!'
    //     });
    // }
    // next();
}