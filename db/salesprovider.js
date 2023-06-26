var connection = require('./connection');

var con = connection

let db = {};

db.getAllSales = () =>{
    return new Promise((resolve, reject)=>{
        con.query('SELECT *,DATE_FORMAT(invoiceDate, "%y/%m/%d") as invoiceDate1,customer.name as customerName,masterconfigaration.name as salesperson FROM `sales` INNER join customer on customer.customerId=sales.customerId INNER join masterconfigaration on masterconfigaration.masterConfigarationId=sales.masterConfigarationId',  (error, customer)=>{
            if(error){
                return reject(error);
            }
            return resolve(customer);
        });
    });
};

db.getPerticularSale = (salesCode) =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT invoiceNo  from sales where invoiceNo   = '"+ salesCode  +"'",  (error, masterconfigaration)=>{
            if(error){
                return reject(error);
            }
            return resolve(masterconfigaration);
        });
    });
};

db.insertSales = (sales) =>{

    const insertquery="INSERT INTO sales (invoiceNo,customerId,masterConfigarationId,invoiceDate,total ) VALUES" 
    +"('"+sales.invoiceNo+"',"+sales.customerId +","+sales.masterConfigarationId +",'"+sales.invoiceDate+"',"+sales.total+");";

   
    return new Promise((resolve, reject)=>{
        con.query(insertquery,  (error, customer)=>{
            if(error){
                return reject("error");
            }
            return resolve("Added Successfully ");
        });
    });
};

db.insertImportSales = (sales,customerId,masterConfigarationId) =>{

    const insertquery="INSERT INTO sales (invoiceNo,customerId,masterConfigarationId,invoiceDate,total ) VALUES" 
    +"('"+sales.invoiceNo+"',"+customerId+","+masterConfigarationId+",'"+sales.invoiceDate+"',"+sales.total+");";

   
    return new Promise((resolve, reject)=>{
        con.query(insertquery,  (error, customer)=>{
            if(error){
                return reject("error");
            }
            return resolve("Added Successfully ");
        });
    });
};



db.updateSales = (sales) =>{

    
    const updatequery="UPDATE sales"+
    " SET invoiceNo= '"+sales.invoiceNo+"', customerId= "+sales.customerId+",masterConfigarationId= "+sales.masterConfigarationId+""+
    ",invoiceDate= '"+sales.invoiceDate+"',total= "+sales.total+" "+
    " WHERE salesId  = "+sales.salesId ;
   

    return new Promise((resolve, reject)=>{
        con.query(updatequery,  (error, customer)=>{
            if(error){
                return reject("error");
            }
            return resolve("Updated Successfully ");
        });
    });
};


db.deleteSales = (sales) =>{

    
    const deleteQuery="DELETE FROM sales  WHERE salesId = "+sales.salesId;
   

    return new Promise((resolve, reject)=>{
        con.query(deleteQuery,  (error, customer)=>{
            if(error){
                return reject(error);
            }
            return resolve("deleted Successfully ");
        });
    });
};
 
  
module.exports = db;