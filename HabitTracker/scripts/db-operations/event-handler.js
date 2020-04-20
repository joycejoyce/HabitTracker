import {TableProcessor, PROCESS} from "./table-processor.js";
import {HTML_ID, HTML_PROPERTY, EVENT} from "./html-properties.js";
import {TABLE_NAME} from "./db-info.js";

function EventHandler() {
    this.addEventHandlers = function() {
        addClickEventHandlerOnCreateTblButton();
        addClickEventHandlerOnDeleteTblButton();
    }
    
    function addClickEventHandlerOnCreateTblButton() {
        $(document).find(`button[id$="-tbl-create-btn"]`).on(
            EVENT.click,
            function() {
                const tableName = $(this).prop(HTML_PROPERTY.id).split("-")[0];
                const processor = new TableProcessor(tableName, PROCESS.create).getProcessor();
                processor.process();
            }
        );
    }
    
    function addClickEventHandlerOnDeleteTblButton() {
        $(document).find(`button[id$="-tbl-delete-btn"]`).on(
            EVENT.click,
            function() {
                const tableName = $(this).prop(HTML_PROPERTY.id).split("-")[0];
                const processor = new TableProcessor(tableName, PROCESS.delete).getProcessor();
                processor.process();
            }
        );
    }
}

export {
    EventHandler
};