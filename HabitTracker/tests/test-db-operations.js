import {loadHTMLFile} from "./common-func-for-tests.js";
import {TBL_TRACK_COLUMN, TABLE_NAME} from "../scripts/db-operations/constants/db-info.js";
import {TableProcessor} from "../scripts/db-operations/table-processors/table-processor.js";
import {HTML_ID, HTML_CLASS, CSS_PROPERTY, CSS_VALUE} from "../scripts/db-operations/constants/html-properties.js";

const expect = require("chai").expect;

describe(`GUI of querying DB data`, () => {
    const file = "./scripts/db-operations/index.html";
    let loadDoc;
    beforeEach(() => {loadDoc = loadHTMLFile(file)});
    
    it(`choose table "track", show:\n1. ${TBL_TRACK_COLUMN.userId}\n2. ${TBL_TRACK_COLUMN.habitId}\n3. ${TBL_TRACK_COLUMN.date}`, () => {
        loadDoc.then(() => { //Promise's success callback (not provide reject callback)
            checkBeforeClickOnQueryTableTrack();
            console.log("pass checkBeforeClickOnQueryTableTrack()");
            
            const queryList = document.getElementById(HTML_ID.queryTableTrack);
            $(queryList).click();
            
            checkAfterClickOnQueryTableTrack();
            console.log("pass checkAfterClickOnQueryTableTrack()");
        })//Don't catch. Otherwise, the error line number won't be shown.
        /*.catch((err) => {console.error("Caught exception: " + err.message);})*/;
    });
    
    function checkBeforeClickOnQueryTableTrack() {
        const doms = Array.prototype.slice.call(document.getElementsByClassName(HTML_CLASS.queryForm));
        console.log(doms);
        doms.forEach((dom) => {
            console.log(dom.outerHTML);
            const style = window.getComputedStyle(dom);
            const display = style.getPropertyValue(CSS_PROPERTY.display);
            expect(display).to.eql(CSS_VALUE.none); 
        })
    }
    
    function checkAfterClickOnQueryTableTrack() {
       
    }
})