var connection = require('./connection');

var con = connection

let db = {};

db.geSalesOutandingByCustomerId1 = (customerRefNo) =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT *,DATE_FORMAT(invoiceDate, '%d/%m/%y') as invoiceDate1,receiptAmount FROM salesOutstanding where customerRefNo = '"+customerRefNo+"'",  (error, salesoutstanding)=>{
            if(error){
                return reject(error);
            }
            return resolve(salesoutstanding);
        });
    });
};

db.geSalesOutandingByCustomerId = (customerRefNo) =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT *,DATE_FORMAT(invoiceDate, '%d/%m/%y') as invoiceDate1,receiptAmount FROM salesOutstanding "+
        "inner join billwisereceiptdetail on billwisereceiptdetail.invoiceNo=salesOutstanding.invoiceNo " +
        "where billwisereceiptdetail.receiptNo = '"+customerRefNo+"'",  (error, salesoutstanding)=>{
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

db.getDetailOutstanding = (salesSummary) =>{

    var sql="SELECT invoiceNo,DATE_FORMAT(invoiceDate,'%d/%m/%y')as invoiceDate,"

    if(salesSummary.reportType=="Summary"){
        sql=sql+ " sum(balance) as balance,";   

    }else{
        sql=sql+ "  balance,";
    }

    
    sql=sql+  "customerRefNo,DATEDIFF(CURRENT_DATE, invoiceDate) as datediff FROM `salesOutstanding` "
    
    if(salesSummary.reportType=="Summary"){
        sql=sql+ " group by customerRefNo";   

    }


    sql=sql+ " order by invoiceDate desc";   
    return new Promise((resolve, reject)=>{
        con.query(sql,  (error, salesSummary)=>{
           
            if(error){
                return reject(error);
            }
            return resolve(salesSummary);
        });
    });
};


module.exports = db;    