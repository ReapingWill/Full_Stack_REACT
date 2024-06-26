const SESSION_ROUTES = require('../controllers/session.controller.js');

const sessionRoutesEndpoint = (app) => {
    app.get("/session/:id", SESSION_ROUTES.getUserSession);
    app.post("/session/:id", SESSION_ROUTES.createSession);
    app.get("/validate_token", SESSION_ROUTES.validateToken);
}

module.exports = {sessionRoutesEndpoint};