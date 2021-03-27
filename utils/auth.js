module.exports = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.json({
            message: 'Sorry... you need to be logged in to see this page',
        });
    }
};

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.json({
            message: 'Sorry... you need to be logged in to see this page',
        });
    }
};

const isAuthorized = (req, res, next) => {
    if (req.session.admin === true) {
        next();
    } else {
        res.json({
            message:
                'You must have admin status to see this page. You are not an admit. You should not be attempting to edit items.',
        });
    }
};

module.exports = {
    isAuthenticated,
    isAuthorized,
};
