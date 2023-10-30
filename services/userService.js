import mysql from 'mysql'
import config from '../db.js'
import 'dotenv/config'

const userTabla = process.env.DB_TABLA_USERS;
var connection = mysql.createPool({
    host: "sql10.freemysqlhosting.net",
    user: "sql10526623",
    port: "3306",
    password: "DGKSSSQY16",
    database: "sql10526623",
});

export class UserService {
    getUserByDni = async (dni) => {
        const result = await getUser(dni);

        function getUser(dni) {
            return new Promise((resolve, reject) => {
                connection.getConnection(function (err, tempCont) {
                    if (err) {
                    console.log(err)
                    } else {
                    var sql =
                        "SELECT * FROM users WHERE id = ?";
                    connection.query(sql, [dni], function (err2, result, fields) {
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

    // createUser = async (user) => {
    //     connection.connect();
    //     const result = await createUser(user);
        
    //     function createUser(user) {
    //         const randomId = Math.floor(100000 + Math.random() * 900000)

    //         return new Promise((resolve, reject) => {
    //             connection.query(
    //             "INSERT INTO users (id, number, name, surname, birthdate, emission_date, expiration_date, tramite_number, ejemplar, sex, cuil, image, firma, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    //             [randomId ,user?.number, user?.name, user?.surname, user?.birthdate, user?.emission_date, user?.expiration_date, user?.tramite_number, user?.ejemplar, user?.sex, user?.cuil, user?.image, user?.firma, user?.address],
    //             (err, result) => {
    //               return err ? reject(err) : resolve(result[0]);
    //             }
    //           );
    //         });
    //     }

    //     return result;
    // }

    // updateUserByDni = async (dni, user) => {
    //     // const pool = await sql.connect(config);
    //     // const response = await pool.request()
    //     //     .input('id',sql.Int, id)
    //     //     .input('number',sql.VarChar, user?.number ?? '')
    //     //     .input('name',sql.VarChar, user?.name ?? '')
    //     //     .input('surname',sql.VarChar, user?.surname ?? '')
    //     //     .input('birthdate',sql.VarChar, user?.birthdate ?? '')
    //     //     .input('emission_date',sql.VarChar, user?.emission_date ?? '')
    //     //     .input('expiration_date',sql.VarChar, user?.expiration_date ?? '')
    //     //     .input('tramite_number',sql.VarChar, user?.tramite_number ?? '')
    //     //     .input('ejemplar',sql.VarChar, user?.ejemplar ?? '')
    //     //     .input('sex',sql.VarChar, user?.sex ?? '')
    //     //     .input('cuil',sql.VarChar, user?.cuil ?? '')
    //     //     .input('image',sql.VarChar, user?.image ?? '')
    //     //     .input('firma',sql.VarChar, user?.firma ?? '')
    //     //     .input('address',sql.VarChar, user?.address ?? '')
    //     //     .query(`UPDATE ${userTabla} SET number = @number, name = @name, surname = @surname, birthdate = @birthdate, emission_date = @emission_date, expiration_date = @expiration_date, tramite_number = @tramite_number, ejemplar = @ejemplar, sex = @sex, cuil = @cuil, image = @image, firma = @firma, address = @address WHERE id = @id`);
    //     // console.log(response)

    //     // return response.recordset;

    //     connection.connect();
    //     const result = await updateUser(dni, user);
    //     connection.end();
        
    //     function updateUser(dni, user) {
    //         return new Promise((resolve, reject) => {
    //             connection.query(
    //             "UPDATE users SET name = ?, surname = ?, birthdate = ?, emission_date = ?, expiration_date = ?, tramite_number = ?, ejemplar = ?, sex = ?, cuil = ?, image = ?, firma = ?, address = ? WHERE number = ?",
    //             [user?.name, user?.surname, user?.birthdate, user?.emission_date, user?.expiration_date, user?.tramite_number, user?.ejemplar, user?.sex, user?.cuil, user?.image, user?.firma, user?.address, dni],
    //             (err, result) => {
    //               return err ? reject(err) : resolve(result[0]);
    //             }
    //           );
    //         });
    //     }

    //     return result;
    // }

    // deleteUserByDni = async (dni) => {
    //     connection.connect();
    //     const result = await deleteUser(dni);
    //     // connection.end();
        
    //     function deleteUser(dni) {
    //         return new Promise((resolve, reject) => {
    //             connection.query(
    //             "DELETE FROM users WHERE number = ?",
    //             [dni],
    //             (err, result) => {
    //               return err ? reject(err) : resolve(result[0]);
    //             }
    //           );
    //         });
    //     }

    //     return result;
    // }
}