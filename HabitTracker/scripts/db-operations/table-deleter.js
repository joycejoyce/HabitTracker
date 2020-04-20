import {TABLE_NAME, TBL_TRACK_COLUMN} from "./db-info.js";
import {DBSetter} from "./db-setter.js";
import {Message} from "./message.js";
import {PROCESS} from "./table-processor.js";

function TableDeleter(tableName) {
    let dynamoDB = new DBSetter().getDynamoDB();
    
    this.process = function() {
        const params = {
            TableName: tableName
        };
        
        deleteTableByDynamoDB(params);
    };
    
    function deleteTableByDynamoDB(params) {
        dynamoDB.deleteTable(params, function(err, data) {
            if(err) {
                Message.showTableProcessFailMessage(err, PROCESS.delete);
            }
            else {
                Message.showTableProcessSuccessMessage(data, PROCESS.delete);
            }
        });
    }
}

export {
    TableDeleter
};