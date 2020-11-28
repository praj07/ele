import { NextFunction, Request, Response } from "express";

function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
    console.log(req.signedCookies);
    if (req.signedCookies.user_id) {
        next();
    } else {
        res.redirect(301, '/');
    }
}
module.exports = {
    ensureLoggedIn,
}
