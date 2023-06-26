
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
        con.query('SELECT customerId,customerRefNo,name,telephoneNumber,DATE_FORMAT(createdDate, "%y/%m/%d %r") AS createdDate,DATE_FORMAT(updatedDate, "%y/%m/%d %r") AS updatedDate,STATUS,email,address,areaCode from customer ', (error, sales) => {
          //  con.release()
          console.log(sales)
            if (error) {
                return reject(error);
            }
            return resolve(sales);
        });
       
    });
};

db.insertCustomers = (customer) => {

    const insertquery = "INSERT INTO customer (customerRefNo, name, telephoneNumber, email,address,areaCode,createdDate,updatedDate,STATUS) VALUES"
        + "('" + customer.customerRefNo + "','" + customer.name + "','" + customer.telephoneNumber + "','" + customer.email + "','" + customer.address + "'," + customer.areaCode + ", NOW(),NOW()"
        + ",'" + customer.status + "'); "

    console.log(insertquery);

    return new Promise((resolve, reject) => {
        con.query(insertquery, (error, customer) => {
            if (error) {
                return reject("error");
            }
            return resolve("Added Successfully ");
        });
    });
};


db.updateCustomers = (customer) => {


    const updatequery = "UPDATE customer" +
        " SET customerRefNo= '" + customer.customerRefNo + "', name= '" + customer.name + "',telephoneNumber= '" + customer.telephoneNumber + "',areaCode=" + customer.areaCode +
        ",email= '" + customer.email + "',address= '" + customer.address + "',status= '" + customer.status + "',updatedDate=NOW()" +
        " WHERE customerId  = " + customer.customerId;

    console.log(updatequery);

    return new Promise((resolve, reject) => {
        con.query(updatequery, (error, customer) => {
            if (error) {
                return reject("error");
            }
            return resolve("Updated Successfully ");
        });
    });
};


db.deleteCustomers = (customer) => {


    const deleteQuery = "DELETE FROM customer  WHERE customerId = " + customer.customerId;


    return new Promise((resolve, reject) => {
        con.query(deleteQuery, (error, customer) => {
            if (error) {
                return reject(error);
            }
            return resolve("deleted Successfully ");
        });
    });
};

db.getActiveCustomers = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT customerId,customerRefNo ,name as label,telephoneNumber,DATE_FORMAT(createdDate, '%y/%m/%d %r') AS createdDate,DATE_FORMAT(updatedDate, '%y/%m/%d %r') AS updatedDate,STATUS,email,address from customer where STATUS='available' ", (error, customer) => {
            if (error) {
                return reject(error);
            }
            return resolve(customer);
        });
    });
};

db.getAutoincrementForCustomer = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'customer'; ", (error, customer) => {
            if (error) {
                return reject(error);
            }
            return resolve(customer);
        });
    });
};



module.exports = db;