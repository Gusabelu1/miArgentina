import { Router } from "express";
import { UserService } from "../services/userService.js";
import { Authenticate } from "../common/jwt.strategy.js";
import { generateMrz } from '../services/mrz-generator/index.js'

const router = Router();
const userService = new UserService();

router.get("/getByDni", Authenticate, async function (req, res) {
    const user = await userService.getUserByDni(req.query.dni);
    
    return res.status(200).json(user);
});

router.post("/mrz", async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    const inputData = req.body

    if (!req.body.passport || !req.body.user) {
        return res.status(404)
    } else {
        const mrz = generateMrz(inputData)
    
        return res.status(200).json(mrz)
    }

})

// router.post("/create", Authenticate, async function (req, res) {
//     const user = await userService.createUser(req.body);

//     return res.status(201);
// });

// router.post("/update", Authenticate, async function (req, res) {
//     const user = await userService.updateUserByDni(req.query.dni, req.body);
    
//     return res.status(201);
// });

// router.delete("", Authenticate, async function (req, res) {
//     await userService.deleteUserByDni(req.query.dni);
    
//     return res.status(202);
// });

export default router;