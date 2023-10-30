import jwt from "jsonwebtoken";
import mysql from 'mysql'
import "dotenv/config";

var connection = mysql.createPool({
    host: "sql10.freemysqlhosting.net",
    user: "sql10526623",
    port: "3306",
    password: "DGKSSSQY16",
    database: "sql10526623",
});

export class TokenService {
    getRandomString = () => {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 18; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
    };

    getSignedToken = () => {
        const token = jwt.sign(
            {},
            "miArgentinaAPI",
            {
            issuer: "https://com.pina.miargentinaapi/",
            audience: ["http://localhost/"],
            expiresIn: 60 * 60 * 24 * 7 * 4,
            }
        );

        return token;
    };

    verifyToken = (reqToken) => {
        const token = jwt.verify(reqToken, "miArgentinaAPI", 
            {
                issuer: "https://com.pina.miargentinaapi/",
                audience: "http://localhost/",
            },
            function(err, decoded) {
                if (err){
                    err
                } else {
                    return [decoded.exp, decoded.iat]
                }
            }
        );

        // console.log(token);
        return token;
    }

    getLogin = async (dni, password) => {
        const result = await getPassword(dni, password);

        function getPassword(dni, password) {
            return new Promise((resolve, reject) => {
                connection.getConnection(function (err, tempCont) {
                    if (err) {
                    console.error(err)
                    } else {
                    var sql =
                        "SELECT * FROM users WHERE id = ? AND password = ?";
                    connection.query(sql, [dni, password], function (err2, result, fields) {
                        if (err2) {
                        console.log(err2)
                        } else {
                        resolve(result[0])
                        }
                        tempCont.release();
                    });
                    }
                });
            });
        }
        
        return result
    }

}