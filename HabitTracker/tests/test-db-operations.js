import {TBL_TRACK_COLUMN, TABLE_NAME} from "../scripts/db-operations/constants/db-info.js";
import {HTML_ID, HTML_CLASS, CSS_PROPERTY, CSS_VALUE} from "../scripts/db-operations/constants/html-properties.js";

const expect = require("chai").expect;
let window, document, $;

describe(`GUI of querying DB data`, () => {
    const file = "./scripts/db-operations/db-operations.html";
    let loadDoc;
    beforeEach(() => { loadDoc = loadHTMLFile(file) });
    
    it(`test jsdom`, () => {
        loadDoc.then(() => {
            window.addEventListener("load", () => {
                checkBeforeClickOnQueryTableTrack();
            }, false);
        });
    });
    
    it(`choose table "track", show:\n1. ${TBL_TRACK_COLUMN.userId}\n2. ${TBL_TRACK_COLUMN.habitId}\n3. ${TBL_TRACK_COLUMN.date}`, () => {
        loadDoc.then(() => {
            checkBeforeClickOnQueryTableTrack();
            console.log("pass checkBeforeClickOnQueryTableTrack()");
            
            const queryList = document.getElementById(HTML_ID.queryTableTrack);
            $(queryList).click();
            
            checkAfterClickOnQueryTableTrack();
            console.log("pass checkAfterClickOnQueryTableTrack()");
        });
    });
    
    function checkBeforeClickOnQueryTableTrack() {
        const doms = Array.prototype.slice.call(document.getElementsByClassName(HTML_CLASS.queryForm));
        doms.forEach((dom) => {
            const display = getStyle(CSS_PROPERTY.display, dom);
            console.log("(before)display = " + display);
            expect(display).to.eql(CSS_VALUE.none);
        })
    }
    
    function getStyle(name, dom) {
        const computedStyle = window.getComputedStyle(dom);
        return computedStyle.getPropertyValue(name);
    }
    
    function checkAfterClickOnQueryTableTrack() {
       const dom = Array.prototype.slice.call(document.getElementsById(HTML_ID.trackTableQueryForm));
        const display = getStyle(CSS_PROPERTY.display, dom);
        console.log("(after)display = " + display);
        expect(display).to.eql(CSS_VALUE.block);
    }
})

function loadHTMLFile(file) {
    const { JSDOM } = require("jsdom");
    const options = {
        resources: "usable",
        runScripts: "dangerously"
    };
    return JSDOM.fromFile(file, options)
        .then((dom) => {
            window = dom.window;
            document = window.document;
            global.$ = require("jquery")(window);
        });
}