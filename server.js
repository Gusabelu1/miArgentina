import express from "express";
import cors from "cors";
import PersonajeRouter from "./controllers/userController.js";
import TokenRouter from "./controllers/tokenController.js";
import passport from "passport";
import { jwtStrategy } from "./common/jwt.strategy.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());
app.use("/user", PersonajeRouter);
app.use("/auth", TokenRouter);

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});