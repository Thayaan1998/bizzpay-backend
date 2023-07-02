
var connection = require('./connection');

var con = connection

let db = {};

db.getPerticularCustomer = (customerRefNo) => {

    return new Promise((resolve, reject) => {

        con.query("SELECT customerId from customer where customerRefNo = '" + customerRefNo + "'", (error, sales) => {

            if (error) {
                return reject(error);
            }
            return resolve(sales);
        });



    });
};

db.getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        // con.query('', (error, sales) => {
        //   //  con.release()

        //   con._freeConnections.indexOf(connection)
        //   con.release();

        //     if (error) {
        //         return reject(error);
        //     }
        //     return resolve(sales);
        // });

        con.getConnection(function (err, connection) {
            connection.query('SELECT customerId,customerRefNo,name,telephoneNumber,DATE_FORMAT(createdDate, "%d/%m/%y %r") AS createdDate,DATE_FORMAT(updatedDate, "%d/%m/%y %r") AS updatedDate,STATUS,email,address,areaCode from customer ', function (err, rows) {


                connection.release();

                if (err) {
                    return reject(err);
                }
                return resolve(rows);

            });
        });

    });


};

db.insertCustomers = (customer) => {

    const insertquery = "INSERT INTO customer (customerRefNo, name, telephoneNumber, email,address,areaCode,createdDate,updatedDate,STATUS) VALUES"
        + "('" + customer.customerRefNo + "','" + customer.name + "','" + customer.telephoneNumber + "','" + customer.email + "','" + customer.address + "'," + customer.areaCode + ", NOW(),NOW()"
        + ",'" + customer.status + "'); "

    // console.log(insertquery);

    // return new Promise((resolve, reject) => {
    //     con.query(insertquery, (error, customer) => {
    //         if (error) {
    //             return reject("error");
    //         }
    //         return resolve("Added Successfully ");
    //     });
    // });
    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query(insertquery, function (err1, rows) {

                // console.log(); // -1
                connection.release();
                // console.log(); // 0
                if (err1) {
                    return reject(err1);
                }
                return resolve("Added Successfully");

            });
        });
    });
};


db.updateCustomers = (customer) => {


    const updatequery = "UPDATE customer" +
        " SET customerRefNo= '" + customer.customerRefNo + "', name= '" + customer.name + "',telephoneNumber= '" + customer.telephoneNumber + "',areaCode=" + customer.areaCode +
        ",email= '" + customer.email + "',address= '" + customer.address + "',status= '" + customer.status + "',updatedDate=NOW()" +
        " WHERE customerId  = " + customer.customerId;

    // console.log(updatequery);

    // return new Promise((resolve, reject) => {
    //     con.query(updatequery, (error, customer) => {
    //         if (error) {
    //             return reject("error");
    //         }
    //         return resolve("Updated Successfully ");
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query(updatequery, function (err1, rows) {

                // console.log(); // -1
                connection.release();
                // console.log(); // 0
                if (err1) {
                    return reject(err1);
                }
                return resolve("Updated Successfully");

            });
        })
    });

};


db.deleteCustomers = (customer) => {


    const deleteQuery = "DELETE FROM customer  WHERE customerId = " + customer.customerId;


    // return new Promise((resolve, reject) => {
    //     con.query(deleteQuery, (error, customer) => {
    //         if (error) {
    //             return reject(error);
    //         }
    //         return resolve("deleted Successfully ");
    //     });
    // });
    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query(deleteQuery, function (err1, rows) {

                // console.log(); // -1
                connection.release();
                // console.log(); // 0
                if (err1) {
                    return reject(err1);
                }
                return resolve("deleted Successfully");

            });
        });
    });

};

db.getActiveCustomers = () => {
    // return new Promise((resolve, reject) => {
    //     con.query("SELECT customerId,customerRefNo ,name as label,telephoneNumber,DATE_FORMAT(createdDate, '%d/%m/%y %r') AS createdDate,DATE_FORMAT(updatedDate, '%d/%m/%y %r') AS updatedDate,STATUS,email,address from customer where STATUS='available' order by label asc ", (error, customer) => {
    //         if (error) {
    //             return reject(error);
    //         }
    //         return resolve(customer);
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query("SELECT customerId,customerRefNo ,name as label,telephoneNumber,DATE_FORMAT(createdDate, '%d/%m/%y %r') AS createdDate,DATE_FORMAT(updatedDate, '%d/%m/%y %r') AS updatedDate,STATUS,email,address from customer where STATUS='available' order by label asc ", function (err1, rows) {

                // console.log(); // -1
                connection.release();
                // console.log(); // 0
                if (err1) {
                    return reject(err1);
                }
                return resolve(rows);

            });
        });
    });
};

db.getAutoincrementForCustomer = () => {
    // return new Promise((resolve, reject) => {
    //     con.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'customer'; ", (error, customer) => {
    //         if (error) {
    //             return reject(error);
    //         }
    //         return resolve(customer);
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'customer'; ", function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve(rows);

            });
        });
    });
};



module.exports = db;