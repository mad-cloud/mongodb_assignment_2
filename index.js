const express = require("express");
const app = express();

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/mongo";
var dbConnected;
MongoClient.connect(url, (err, db) => {
    if (err)
        console.log(err);
    else {
        var database = db.db("mydb");
        dbConnected = database;
        database.createCollection("items2", (err, suc) => {
            console.log("collection created");
        })
    }
});
app.get("/insertOne", function (req, res) {
    const stu1 = {
        firstName: "Sujit",
        lastName: "S",
        salary: "25000",
        department: "HR",
        overallExp: "1",
        contactInfo: "9087654321",
        yearGrad: "2019",
        gradStream: "CSE"

    };
    dbConnected.collection("items2").insertOne(stu1, (error, suc) => {
        if (error)
            console.log(error);
        console.log("inserted");
        res.send("inserted")
    });
});
app.get("/insertMany", function (req, res) {
    dbConnected
        .collection("items2")
        .insertMany([{

            "firstName": "Kapil",
            "lastName": "D",
            "salary": "25000",
            "department": "Sales",
            "overallExp": "1",
            "contactInfo": "9876543210",
            "yearGrad": "2021",
            "gradStream": "CSE"
        }, {
            "firstName": "Ashish",
            "lastName": "C",
            "salary": "35000",
            "department": "System",
            "overallExp": "2",
            "contactInfo": "9753108642",
            "yearGrad": "2021",
            "gradStream": "CSE"
        }, {
            "firstName": "Mahesh",
            "lastName": "S",
            "salary": "30000",
            "department": "Associate",
            "overallExp": "2",
            "contactInfo": "8076543219",
            "yearGrad": "2021",
            "gradStream": "ECE"
        }, {
            "firstName": "Raj",
            "lastName": "M",
            "salary": "30000",
            "department": "Software",
            "overallExp": "1",
            "contactInfo": "8912345670",
            "yearGrad": "2021",
            "gradStream": "CSE"
        }, {
            "firstName": "Shravani",
            "lastName": "H",
            "salary": "30000",
            "department": "Software",
            "overallExp": "2",
            "contactInfo": "7654321980",
            "yearGrad": "2022",
            "gradStream": "CSE"
        }, {
            "firstName": "Neha",
            "lastName": "D",
            "salary": "25000",
            "department": "Application",
            "overallExp": "1",
            "contactInfo": "795310246",
            "yearGrad": "2022",
            "gradStream": "CSE"
        }, {
            "firstName": "Ankush",
            "lastName": "S",
            "salary": "25000",
            "department": "Sales",
            "overallExp": "1",
            "contactInfo": "809531246",
            "yearGrad": "2022",
            "gradStream": "CSE"
        }, {
            "firstName": "Milind",
            "lastName": "W",
            "salary": "25000",
            "department": "Accounts",
            "overallExp": "1",
            "contactInfo": "8976543210",
            "yearGrad": "2020",
            "gradStream": "MCE"
        }, {
            "firstName": "Bhushan",
            "lastName": "M",
            "salary": "30000",
            "department": "Management",
            "overallExp": "1",
            "contactInfo": "7953124680",
            "yearGrad": "2022",
            "gradStream": "CSE"
        }
        ], (error, suc) => {
            if (error)
                console.log(error);
            console.log("inserted");
            res.send("inserted");
        });
});
app.get("/findOne", function (req, res) {
    dbConnected.collection("items2").findOne({}, (err, suc) => {
        if (err)
            console.log(err);
        else {
            res.json(suc);
        }
    });
});

app.get("/findAll", function (req, res) {
    dbConnected
        .collection("items2")
        .find({})
        .toArray((err, suc) => {
            if (err)
                console.log(err);
            else {
                res.json(suc);
            }
        });
});
app.get("/updateOne", function (req, res) {
    dbConnected
        .collection("items2")
        .updateOne(
            { department: "Software" },
            { $set: { department: "Software", salary: 35000 } },
            function (err, suc) {
                if (err) console.log(err);
                else {
                    res.json(suc);
                }
            }
        );
});

app.get("/updateAll", function (req, res) {
    dbConnected
        .collection("items2")
        .updateMany(
            { department: "Software" },
            { $set: { department: "Software", salary: 35000 } },
            function (err, suc) {
                if (err) console.log(err);
                else {
                    res.json(suc);
                }
            }
        );
});
app.get("/deleteOne", function (req, res) {
    dbConnected.collection("items2").deleteOne({ firstName: "Bhushan" }, (err, suc) => {
        if (err) console.log(err);
        else {
            res.json(suc);
        }
    });
});

app.get("/deleteMany", function (req, res) {
    dbConnected.collection("items2").deleteMany({ lastName: "S" }, (err, suc) => {
        if (err) console.log(err);
        else {
            res.json(suc);
        }
    });
});
app.listen(4005);
