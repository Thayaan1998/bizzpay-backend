const express = require('express');
var cors = require('cors')
const app = express();
const customerProvider = require('./db/customerProvider');
const masterConfigarationProvider = require('./db/masterConfigarationProvider');
const salesprovider = require('./db/salesprovider');
const salesOutStandingProvider = require('./db/salesOutStandingProvider');

const billwisereciptProvider = require('./db/billwisereciptProvider');




app.use(express.json());
app.use(cors())




app.get('/api/getCustomers', async (req, res) => {
    try {
        const customers = await customerProvider.getAllCustomers();
        res.status(200).json(customers);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/postCustomer', async (req, res) => {
    try {
        const staus = await customerProvider.insertCustomers(req.body);

        console.log(req);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/updateCustomer', async (req, res) => {
    try {
        const staus = await customerProvider.updateCustomers(req.body);

        console.log(req);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/deleteCustomer', async (req, res) => {
    try {
        const staus = await customerProvider.deleteCustomers(req.body);

        console.log(req);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.get('/api/getAutoIncrementId', async (req, res) => {
    try {
        const staus = await customerProvider.getAutoincrementForCustomer();

        console.log(req);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});




app.get('/api/getAllMasterCofigarations', async (req, res) => {
    try {
        const masterconfigarations = await masterConfigarationProvider.getAllMasterCofigarations();
        res.status(200).json(masterconfigarations);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});


app.post('/api/postMasterConfigaration', async (req, res) => {
    try {
        const staus = await masterConfigarationProvider.insertMasterConfigaration(req.body);

        //console.log(req);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/updateMasterConfigartion', async (req, res) => {
    try {
        const staus = await masterConfigarationProvider.updateMasterConfigartion(req.body);

        //    console.log(req);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/deleteMasterConfigartion', async (req, res) => {
    try {
        const staus = await masterConfigarationProvider.deleteMasterConfigaration(req.body);

        //    console.log(req);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.get('/api/getSales', async (req, res) => {
    try {
        const sales = await salesprovider.getAllSales();
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.get('/api/getActiveCustomers', async (req, res) => {
    try {
        const sales = await customerProvider.getActiveCustomers();
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.get('/api/getSalesPerson', async (req, res) => {
    try {
        const sales = await masterConfigarationProvider.getSalesPerson();
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/insertSales', async (req, res) => {
    try {

        const sales = await salesprovider.getPerticularSale(req.body.invoiceNo)



        if (sales.length == 0) {
            const sale = await salesprovider.insertSales(req.body)
            const salesOutstanding=await salesOutStandingProvider.insertSalesOutstanding(req.body);
            res.status(200).json("added successfully");

        } else {
            res.status(200).json("perticular Invoice No already added");

        }

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/insertImportSales', async (req, res) => {
    try {
        const customers = await customerProvider.getPerticularCustomer(req.body.customerRefNo)
        

        const salesPerson = await masterConfigarationProvider.getPerticularSalesPerson(req.body.masterConfigarationCode)

        //    console.log(sales)
        const sales = await salesprovider.getPerticularSale(req.body.invoiceNo)

        if (sales.length == 0) {
            const sale = await salesprovider.insertImportSales(req.body, customers[0].customerId,salesPerson==null? salesPerson[0].masterConfigarationId:null)
            const salesOut=await salesOutStandingProvider.insertSalesOutstanding(req.body);
            res.status(200).json(sale);

        } else {
            res.status(200).json("perticular Sales code already added");

        }

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/updateSales', async (req, res) => {
    try {
        const staus = await salesprovider.updateSales(req.body);

        const staus1 = await salesOutStandingProvider.updateSalesOutstanding2(req.body);


        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/deleteSales', async (req, res) => {
    try {
        const staus = await salesprovider.deleteSales(req.body);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});


app.post('/api/getSalesOutstandingbyCustomerCode', async (req, res) => {
    try {
        const sales = await salesOutStandingProvider.geSalesOutandingByCustomerId(req.body.receiptNo)
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

app.post('/api/getSalesOutstandingbyCustomerCode1', async (req, res) => {
    try {
        const sales = await salesOutStandingProvider.geSalesOutandingByCustomerId1(req.body.customerRefNo)
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});
app.get('/api/getBanks', async (req, res) => {
    try {
        const sales = await masterConfigarationProvider.getBanks();
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.get('/api/getPaymentType', async (req, res) => {
    try {
        const sales = await masterConfigarationProvider.paymentTypes();
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.get('/api/getAreaCodes', async (req, res) => {
    try {
        const sales = await masterConfigarationProvider.areaCodes();
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});





app.post('/api/updateSalesOutstanding', async (req, res) => {
    try {
        const staus = await salesOutStandingProvider.updateSalesOutstanding(req.body);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});
app.get('/api/getAllBillWiseReceiptHeader', async (req, res) => {
    try {
        const sales = await billwisereciptProvider.getAllBillWiseReceiptHeader();
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/insertBillWiseReceiptHeader', async (req, res) => {
    try {
        const staus = await billwisereciptProvider.insertBillWiseReceiptHeader(req.body);

        //    console.log(req);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});
app.post('/api/insertBillWiseReceiptDetail', async (req, res) => {
    try {
        const staus = await billwisereciptProvider.insertBillWiseReceiptDetail(req.body);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/getPericularlBillWiseReceiptDetail', async (req, res) => {
    try {
        const billwisereceiptDetails = await billwisereciptProvider.getPericularlBillWiseReceiptDetail(req.body);

        res.status(200).json(billwisereceiptDetails);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});



app.get('/api/chequeHeader', async (req, res) => {
    try {
        const sales = await billwisereciptProvider.getAllChequeHeader();
        res.status(200).json(sales);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/insertChequeHeader', async (req, res) => {
    try {
        const staus = await billwisereciptProvider.insertChequeHeader(req.body);

        //    console.log(req);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});
app.post('/api/insertChequeDetail', async (req, res) => {
    try {
        const staus = await billwisereciptProvider.insertChequeDetail(req.body);

        res.status(200).json(staus);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/getPericularChequedetail', async (req, res) => {
    try {
        const billwisereceiptDetails = await billwisereciptProvider.getPericularChequedetail(req.body);

        res.status(200).json(billwisereceiptDetails);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});


app.post('/api/getDateByWithoutRangeSales', async (req, res) => {
    try {
        const salesDetails = await salesprovider.getDateByWithoutRangeSales(req.body);

        res.status(200).json(salesDetails);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});


app.post('/api/getBillWiseReciptWithDateRange', async (req, res) => {
    try {
        const salesDetails = await billwisereciptProvider.getBillWiseReciptWithDateRange(req.body);

        res.status(200).json(salesDetails);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});

app.post('/api/getDetailOutstanding', async (req, res) => {
    try {
        const salesDetails = await salesOutStandingProvider.getDetailOutstanding(req.body);

        res.status(200).json(salesDetails);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}....`))