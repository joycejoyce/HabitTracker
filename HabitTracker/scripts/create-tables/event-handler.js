import {DBOperator, TABLE_NAME} from "./db-operator.js";
import {HTML_ID, EVENT} from "./html-properties.js";

function EventHandler() {
    this.addEventHandlers = function() {
        addClickEventHandlerOnCreateTrackTblButton();
    }
    
    function addClickEventHandlerOnCreateTrackTblButton() {
        $(document).find("#"+HTML_ID.createTrackTblBtn).first().on(EVENT.click, function() {
            console.log("Enter addClickEventHandlerOnCreateTrackTblButton()");
            new DBOperator().createTable(TABLE_NAME.track);
        })
    }
}

export {
    EventHandler
};