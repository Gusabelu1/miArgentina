import { Router } from "express";
import { TokenService } from "../services/tokenService.js";

const router = Router();
const tokenService = new TokenService();

router.get("/login", async function (req, res) {
    const password = await tokenService.getLogin(req.query.dni, req.query.password);
    let token = null;
    
    if (password) {
        token = await tokenService.getSignedToken();
        return res.status(200).json({Token: token, Data: password});
    } else {
        return res.status(401).send({ message: `Unauthorized` })
    }

})

router.get("/verify", async function (req, res) {
    if (!req.query.token) {
        return res.status(401).send({ message: `Unauthorized` })
    }
    const token = await tokenService.verifyToken(req.query.token);

    return res.status(200).json({exp: token})
})

export default router;