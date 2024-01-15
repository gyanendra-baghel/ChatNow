const sessions = {};

module.exports = (req, res, next) => {
    const { username } = req.session;
    if (!username) {
        return res.redirect("/login");
    } else {
        next();
    }
};