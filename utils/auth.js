module.exports = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.json({
            message: 'Sorry... you need to be logged in to see this page',
        });
    }
};
