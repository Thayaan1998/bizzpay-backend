var connection = require('./connection');

var con = connection

let db = {};



db.getAllMasterCofigarations = () =>{
    // return new Promise((resolve, reject)=>{
    //     con.query('SELECT masterConfigarationId,code,type,name,description,DATE_FORMAT(createdDate, "%d/%m/%y %r") AS createdDate,DATE_FORMAT(updatedDate, "%d/%m/%y %r") AS updatedDate,status from masterconfigaration ',  (error, masterconfigaration)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         return resolve(masterconfigaration);
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query('SELECT masterConfigarationId,code,type,name,description,DATE_FORMAT(createdDate, "%d/%m/%y %r") AS createdDate,DATE_FORMAT(updatedDate, "%d/%m/%y %r") AS updatedDate,status from masterconfigaration ', function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve(rows);

            });
        });
    });
};

db.insertMasterConfigaration = (masterconfigaration) =>{

    const insertquery="INSERT INTO masterconfigaration (code,type, name, description, createdDate,updatedDate,status) VALUES" 
    +"('"+masterconfigaration.code+"','"+masterconfigaration.type+"','"+masterconfigaration.name+"','"+masterconfigaration.description+
    "', NOW(),NOW()"
    +",'"+masterconfigaration.status+"'); "


    // return new Promise((resolve, reject)=>{
    //     con.query(insertquery,  (error, customer)=>{
    //         if(error){
    //             return reject("error");
    //         }
    //         return resolve("Added Successfully ");
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query(insertquery, function (err1, rows) {
                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve("Added Successfully ");

            });
        });
    });
};


db.updateMasterConfigartion = (masterconfigaration) =>{

    
    const updatequery="UPDATE masterconfigaration"+
    " SET code= '"+masterconfigaration.code+"', name= '"+masterconfigaration.name+"',type= '"+masterconfigaration.type+"'"+
    ",description= '"+masterconfigaration.description+"',status= '"+masterconfigaration.status+"',updatedDate=NOW()"+
    " WHERE masterConfigarationId  = "+masterconfigaration.masterConfigarationId ;
   

    // return new Promise((resolve, reject)=>{
    //     con.query(updatequery,  (error, customer)=>{
    //         if(error){
    //             return reject("error");
    //         }
    //         return resolve("Updated Successfully ");
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query(updatequery, function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve("Updated Successfully ");

            });
        });
    });
};


db.deleteMasterConfigaration = (masterconfigaration) =>{

    
    const deleteQuery="DELETE FROM masterconfigaration  WHERE masterConfigarationId = "+masterconfigaration.masterConfigarationId;
   

    // return new Promise((resolve, reject)=>{
    //     con.query(deleteQuery,  (error, customer)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         return resolve("deleted Successfully ");
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query(deleteQuery, function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve("Deleted Successfully ");

            });
        });
    });
};

db.getSalesPerson = () =>{
    // return new Promise((resolve, reject)=>{
    //     con.query("SELECT masterConfigarationId,code,type,name as label,description,DATE_FORMAT(createdDate, '%d/%m/%y %r') AS createdDate,DATE_FORMAT(updatedDate, '%d/%m/%y %r') AS updatedDate,status from masterconfigaration where type='Sales Person' and status='available'   ",  (error, masterconfigaration)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         return resolve(masterconfigaration);
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query("SELECT masterConfigarationId,code,type,name as label,description,DATE_FORMAT(createdDate, '%d/%m/%y %r') AS createdDate,DATE_FORMAT(updatedDate, '%d/%m/%y %r') AS updatedDate,status from masterconfigaration where type='Sales Person' and status='available'   ", function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve(rows);

            });
        });
    });
};

db.getPerticularSalesPerson = (code) =>{
    // return new Promise((resolve, reject)=>{
    //     con.query("SELECT masterConfigarationId from masterconfigaration where code = '"+code+"'",  (error, masterconfigaration)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         return resolve(masterconfigaration);
    //     });
    // });

    
    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query("SELECT masterConfigarationId from masterconfigaration where code = '"+code+"'", function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve(rows);

            });
        });
    });
};

db.getBanks = () =>{
    // return new Promise((resolve, reject)=>{
    //     con.query("SELECT masterConfigarationId,code,type,name,description,DATE_FORMAT(createdDate, '%d/%m/%y %r') AS createdDate,DATE_FORMAT(updatedDate, '%d/%m/%y %r') AS updatedDate,status from masterconfigaration where type='Bank Name' and status='available'   ",  (error, masterconfigaration)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         return resolve(masterconfigaration);
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query("SELECT masterConfigarationId,code,type,name,description,DATE_FORMAT(createdDate, '%d/%m/%y %r') AS createdDate,DATE_FORMAT(updatedDate, '%d/%m/%y %r') AS updatedDate,status from masterconfigaration where type='Bank Name' and status='available'   ", function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve(rows);

            });
        });
    });
};

db.paymentTypes = () =>{
    // return new Promise((resolve, reject)=>{
    //     con.query("SELECT masterConfigarationId,code,type,name,description,DATE_FORMAT(createdDate, '%d/%m/%y %r') AS createdDate,DATE_FORMAT(updatedDate, '%d/%m/%y %r') AS updatedDate,status from masterconfigaration where type='Payment Type' and status='available'   ",  (error, masterconfigaration)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         return resolve(masterconfigaration);
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query("SELECT masterConfigarationId,code,type,name,description,DATE_FORMAT(createdDate, '%d/%m/%y %r') AS createdDate,DATE_FORMAT(updatedDate, '%d/%m/%y %r') AS updatedDate,status from masterconfigaration where type='Payment Type' and status='available'   ", function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve(rows);

            });
        });
    });
};

db.areaCodes = () =>{
    // return new Promise((resolve, reject)=>{
    //     con.query("SELECT masterConfigarationId,name as label from masterconfigaration where type='Area Code' and status='available'   ",  (error, masterconfigaration)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         return resolve(masterconfigaration);
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query("SELECT masterConfigarationId,name as label from masterconfigaration where type='Area Code' and status='available'   ", function (err1, rows) {

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