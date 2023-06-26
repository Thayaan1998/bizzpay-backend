var connection = require('./connection');

var con = connection;
let db = {};

db.getAllBillWiseReceiptHeader = () =>{
    return new Promise((resolve, reject)=>{
        con.query('SELECT billwisereceiptheader.*,DATE_FORMAT(receiptDate, "%y/%m/%d") as receiptDate1,customer.name as customerName, masterconfigaration.name as bankName FROM billwisereceiptheader INNER JOIN customer on customer.customerId=billwisereceiptheader.customerId INNER JOIN masterconfigaration on masterconfigaration.masterConfigarationId=billwisereceiptheader.bankId order by receiptDate desc;',  (error, billwiseRecipts)=>{
            if(error){
                return reject(error);
            }
            return resolve(billwiseRecipts);
        });
    });
};

db.getPericularlBillWiseReceiptDetail = (masterconfigaration) =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT *   from billwisereceiptdetail where receiptNo = '"+masterconfigaration.receiptNo+"'",  (error, billwiseRecipts)=>{
            if(error){
                return reject(error);
            }
            return resolve(billwiseRecipts);
        });
    });
};

db.insertBillWiseReceiptHeader = (billwisereceiptheader) =>{

    const insertquery="INSERT INTO billwisereceiptheader (receiptNo,receiptDate,customerId,paymentId,bankId ,amount,chequeNo, subTotal) VALUES" 
    +"('"+billwisereceiptheader.receiptNo+"','"+billwisereceiptheader.receiptDate+"',"+billwisereceiptheader.customerId
    +","+billwisereceiptheader.paymentId+","+billwisereceiptheader.bankId+","+billwisereceiptheader.amount+",'"+billwisereceiptheader.chequeNo
    +"',"+billwisereceiptheader.subTotal+");";

 
   
    return new Promise((resolve, reject)=>{
        con.query(insertquery,  (error, billwisereceiptheader)=>{
            if(error){
                return reject(error);
            }
            return resolve("Added Successfully");
        });
    });
};

db.insertBillWiseReceiptDetail = (billwisereceiptDetail) =>{

    const insertquery="INSERT INTO billwisereceiptdetail (receiptNo,invoiceNo,amount ) VALUES" 
    +"('"+billwisereceiptDetail.receiptNo+"','"+billwisereceiptDetail.invoiceNo+"',"+billwisereceiptDetail.amount+");";
    console.log(insertquery)
   
    return new Promise((resolve, reject)=>{
        con.query(insertquery,  (error, billwisereceiptheader)=>{
            if(error){
                return reject("error");
            }
            return resolve("Added Successfully ");
        });
    });
};



db.getAllChequeHeader = () =>{
    return new Promise((resolve, reject)=>{
        con.query('SELECT chequeheader.*,DATE_FORMAT(receiptDate, "%y/%m/%d") as receiptDate1,customer.name as customerName, masterconfigaration.name as bankName FROM chequeheader INNER JOIN customer on customer.customerId=chequeheader.customerId INNER JOIN masterconfigaration on masterconfigaration.masterConfigarationId=chequeheader.bankId order by receiptDate desc;',  (error, billwiseRecipts)=>{
            if(error){
                return reject(error);
            }
            return resolve(billwiseRecipts);
        });
    });
};

db.getPericularChequedetail = (billwisereceiptheader) =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT *   from billwisereceiptdetail where chequeNo = '"+billwisereceiptheader.chequeNo+"'",  (error, billwiseRecipts)=>{
            if(error){
                return reject(error);
            }
            return resolve(billwiseRecipts);
        });
    });
};

db.insertChequeHeader = (billwisereceiptheader) =>{

    const insertquery="INSERT INTO chequeheader (receiptNo,receiptDate,customerId,paymentId,bankId ,amount ) VALUES" 
    +"('"+billwisereceiptheader.receiptNo+"','"+billwisereceiptheader.receiptDate+"',"+billwisereceiptheader.customerId
    +","+billwisereceiptheader.paymentId+","+billwisereceiptheader.bankId+","+billwisereceiptheader.amount+");";

 
   
    return new Promise((resolve, reject)=>{
        con.query(insertquery,  (error, billwisereceiptheader)=>{
            if(error){
                return reject(error);
            }
            return resolve("Added Successfully");
        });
    });
};

db.insertChequeDetail = (billwisereceiptDetail) =>{

    const insertquery="INSERT INTO chequedetail (receiptNo,invoiceNo,amount ) VALUES" 
    +"('"+billwisereceiptDetail.receiptNo+"','"+billwisereceiptDetail.invoiceNo+"',"+billwisereceiptDetail.amount+");";
    console.log(insertquery)
   
    return new Promise((resolve, reject)=>{
        con.query(insertquery,  (error, billwisereceiptheader)=>{
            if(error){
                return reject("error");
            }
            return resolve("Added Successfully ");
        });
    });
};

module.exports = db;