import {HTML_ID} from "./html-properties.js";

function DBOperator() {
    let dynamoDB;
    
    this.createTable = function(tableName) {
        console.log(`going to create table "${tableName}"`);
        setupDB();
        
        switch(tableName) {
            case TABLE_NAME.track:
                createTrackTable();
                break;
            default:
                throw `Unexpected tableName [${tableName}]`;
                break;
        }
    };
    
    function setupDB() {
        setDBConfig();
        initDB();
    }
    
    function setDBConfig() {
        console.log("Enter setDBConfig()");
        AWS.config.update({
                region: "us-west-2",
                endpoint: 'http://localhost:8000', // accessKeyId default can be used while using the downloadable version of DynamoDB. 
                // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
                accessKeyId: "fakeMyKeyId", // secretAccessKey default can be used while using the downloadable version of DynamoDB. 
                // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
                secretAccessKey: "fakeSecretAccessKey"
            }
        );
    }
    
    function initDB() {
        console.log("Enter initDB()");
        dynamodb = new AWS.DynamoDB();
    }
    
    function createTrackTable() {
        console.log("Enter createTrackTable()");
        var params = {
            TableName: "track",
            KeySchema: [{
                    AttributeName: "user_id",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "habit_id",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "date",
                    KeyType: "RANGE"
                }
            ],
            AttributeDefinitions: [{
                    AttributeName: "user_id",
                    AttributeType: "S"
                },
                {
                    AttributeName: "habit_id",
                    AttributeType: "N"
                },
                {
                    AttributeName: "date",
                    AttributeType: "S"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 31,
                WriteCapacityUnits: 5
            }
        };
        
        createTableByDynamoDB(params);
    }
    
    function createTableByDynamoDB(params) {
        console.log("Enter createTableByDynamoDB()");
        dynamodb.createTable(params, function(err, data) {
            if(err) {
                showCreatTableFailMessage(tableName, err);
            }
            else {
                showCreateTableSuccessMessage(data);
            }
        });
    }
    
    function showCreatTableFailMessage(tableName, err) {
        const msg = "Unable to create table: " + "\n" + JSON.stringify(err, undefined, 2);
        document.getElementById(HTML_ID.textArea).innerHTML = msg;
    }

    function showCreateTableSuccessMessage(data) {
        document.getElementById(HTML_ID.textArea).innerHTML = "Created table: " + "\n" + JSON.stringify(data, undefined, 2);
    }
}

const TABLE_NAME = {
    track: "track"
};

export {
    DBOperator,
    TABLE_NAME
};