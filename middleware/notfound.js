module.exports = function(req, res, next) {
    res.status(404).render("notFound404", {title: "Page Not Found"});
}













