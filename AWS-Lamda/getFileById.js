
'use strict'
const AWS = require('aws-sdk');




AWS.config.update({ region: process.env.REGION })
//const uuid = require('uuid');

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    var id = event.queryStringParameters.id;
    var name = event.queryStringParameters.username;


    //let id = 'QkNazuWDEZsria4klUkb2IsQW';
    const params = {
        TableName: "FileData",
        Key: {
            Id: id
        }
    }

    try {
        const data = await documentClient.get(params).promise();
        let uplodedDate = new Date(data["Item"]["uploadedDate"]);
        const today = new Date();
        const yesterday = new Date(today);

        yesterday.setDate(yesterday.getDate() - 1);
        let response = null;
        if (uplodedDate < yesterday) {
            response = {
                statusCode: 404,
                body: JSON.stringify({ "message": "FILE_OUTDATED" }),
            };
        } else {

            response = {
                statusCode: 200,
                body: JSON.stringify(data),
            };
        }

        // get user

        // let name =  auth.getUser();

        //put log into db

        const logParams = {
            TableName: "log",
            Item: {
                id: makeid(10),
                file_ID: id,
                username: name,
                downloadDate: new Date().toISOString()
            }

        }
        await putFileData(logParams);

        return response;
    } catch (err) {
        const response = {
            statusCode: 404,
            body: JSON.stringify({ "message": "File not found with id: " + id }),
        };
        return response;
    }

    async function putFileData(data) {
        AWS.config.update({ region: "us-east-1" });
        const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
        const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

        try {
            await documentClient.put(data).promise();
            console.log(data);

        } catch (err) {
            console.log(err);
        }
    }
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }






}
