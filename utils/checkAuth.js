module.exports = function(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({error: 'You are not authorized to view this resource 😢'});
};