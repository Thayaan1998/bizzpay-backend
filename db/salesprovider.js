var connection = require('./connection');

var con = connection

let db = {};

db.getAllSales = () =>{
    // return new Promise((resolve, reject)=>{
    //     con.query('SELECT *,DATE_FORMAT(invoiceDate, "%d/%m/%y") as invoiceDate1,customer.name as customerName,masterconfigaration.name as salesperson FROM `sales` left join customer on customer.customerId=sales.customerId left join masterconfigaration on masterconfigaration.masterConfigarationId=sales.masterConfigarationId',  (error, customer)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         // console.log(customer)
    //         return resolve(customer);
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query('SELECT *,DATE_FORMAT(invoiceDate, "%d/%m/%y") as invoiceDate1,customer.name as customerName,masterconfigaration.name as salesperson FROM `sales` left join customer on customer.customerId=sales.customerId left join masterconfigaration on masterconfigaration.masterConfigarationId=sales.masterConfigarationId', function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve(rows);

            });
        });
    });
};

db.getPerticularSale = (salesCode) =>{
    // return new Promise((resolve, reject)=>{
    //     con.query("SELECT invoiceNo  from sales where invoiceNo   = '"+ salesCode  +"'",  (error, masterconfigaration)=>{
    //         if(error){
    //             return reject(error);
    //         }
    //         return resolve(masterconfigaration);
    //     });
    // });

    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query("SELECT invoiceNo  from sales where invoiceNo   = '"+ salesCode  +"'", function (err1, rows) {

                connection.release();
                if (err1) {
                    return reject(err1);
                }
                return resolve(rows);

            });
        });
    });
};

db.insertSales = (sales) =>{

    const insertquery="INSERT INTO sales (invoiceNo,customerId,masterConfigarationId,invoiceDate,total ) VALUES" 
    +"('"+sales.invoiceNo+"',"+sales.customerId +","+sales.masterConfigarationId +",'"+sales.invoiceDate+"',"+sales.total+");";

    // console.log(insertquery)
   
    // return new Promise((resolve, reject)=>{
    //     con.query(insertquery,  (error, customer)=>{
    //         con
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

db.insertImportSales = (sales,customerId,masterConfigarationId) =>{

    const insertquery="INSERT INTO sales (invoiceNo,customerId,masterConfigarationId,invoiceDate,total ) VALUES" 
    +"('"+sales.invoiceNo+"',"+customerId+","+masterConfigarationId+",'"+sales.invoiceDate+"',"+sales.total+");";

    // console.log(insertquery);
   
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



db.updateSales = (sales) =>{

    
    const updatequery="UPDATE sales"+
    " SET invoiceNo= '"+sales.invoiceNo+"', customerId= "+sales.customerId+",masterConfigarationId= "+sales.masterConfigarationId+""+
    ",invoiceDate= '"+sales.invoiceDate+"',total= "+sales.total+" "+
    " WHERE salesId  = "+sales.salesId ;
   

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


db.deleteSales = (sales) =>{

    
    const deleteQuery="DELETE FROM sales  WHERE salesId = "+sales.salesId;
   

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
                return resolve("deleted Successfully ");

            });
        });
    });
};

db.getDateByWithoutRangeSales = (salesSummary) =>{

    var sql="select invoiceNo,DATE_FORMAT(invoiceDate,'%d/%m/%y')as invoiceDate,customer.name as customerName,masterconfigaration.name as salesperson,total from sales"+
    " inner join customer on customer.customerId=sales.customerId inner join masterconfigaration on masterconfigaration.masterConfigarationId=sales.masterConfigarationId ";   
    
    if(salesSummary.dateType!=""&& salesSummary.masterConfigarationId!=""){
        sql=sql+" where masterconfigaration.masterConfigarationId="+salesSummary.masterConfigarationId+" and  "+salesSummary.dateType;

    }else
    if(salesSummary.dateType!=""){
        sql=sql+" where  "+salesSummary.dateType;
    }else if(salesSummary.masterConfigarationId!=""){
        sql=sql+" where masterconfigaration.masterConfigarationId="+salesSummary.masterConfigarationId;
    }

    // return new Promise((resolve, reject)=>{
    //     con.query(sql,  (error, salesSummary)=>{
           
    //         if(error){
    //             return reject(error);
    //         }
    //         return resolve(salesSummary);
    //     });
    // });

    
    return new Promise((resolve, reject) => {
        con.getConnection(function (err, connection) {
            connection.query(sql, function (err1, rows) {

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