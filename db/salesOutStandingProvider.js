var connection = require('./connection');

var con = connection

let db = {};

db.geSalesOutandingByCustomerId = (customerRefNo) =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT *,DATE_FORMAT(invoiceDate, '%y/%m/%d') as invoiceDate1,receiptAmount FROM salesOutstanding where customerRefNo = '"+customerRefNo+"'",  (error, salesoutstanding)=>{
            if(error){
                return reject(error);
            }
            return resolve(salesoutstanding);
        });
    });
};


db.updateSalesOutstanding = (salesOutstanding) =>{

    
    const updatequery="UPDATE salesOutstanding"+
    " SET balance= "+salesOutstanding.balance+",receiptAmount= "+salesOutstanding.receiptAmount+
    " WHERE invoiceNo   = '"+salesOutstanding.invoiceNo+"'" ;
   
    return new Promise((resolve, reject)=>{
        con.query(updatequery,  (error, customer)=>{
            if(error){
                return reject("error");
            }
            return resolve("Updated Successfully ");
        });
    });
};

db.insertSalesOutstanding = (sales) =>{

    const insertquery="INSERT INTO salesOutstanding (invoiceNo,customerRefNo,invoiceDate,invoiceAmount,receiptAmount,balance) VALUES" 
    +"('"+sales.invoiceNo+"','"+sales.customerRefNo +"','"+sales.invoiceDate +"',"+sales.total+",0,"+sales.total+");";

  
   
    return new Promise((resolve, reject)=>{
        con.query(insertquery,  (error, customer)=>{
            if(error){
                return reject("error");
            }
            return resolve("Added Successfully ");
        });
    });
};

module.exports = db;    