import {HTML_CLASS, CSS_PROPERTY, CSS_VALUE} from "../constants/html-properties.js";

const expect = require("chai").expect;

describe(`GUI of querying DB data`, () => {
    //const file = "../db-operations.html";
    const file = "./scripts/db-operations/db-operations.html";
    let loadDoc;
    beforeEach(() => { loadDoc = loadHTMLFile(file) });
    
    it(`test jsdom`, () => {
        loadDoc.then(() => {
            console.log("loadDoc loaded");
            window.addEventListener("load", () => {
                console.log("window loaded");
                checkBeforeClickOnQueryTableTrack();
            }, false);
        });
    });
    
    /*it(`choose table "track", show:\n1. ${TBL_TRACK_COLUMN.userId}\n2. ${TBL_TRACK_COLUMN.habitId}\n3. ${TBL_TRACK_COLUMN.date}`, () => {
        loadDoc.then(() => {
            checkBeforeClickOnQueryTableTrack();
            console.log("pass checkBeforeClickOnQueryTableTrack()");
            
            const queryList = document.getElementById(HTML_ID.queryTableTrack);
            $(queryList).click();
            
            checkAfterClickOnQueryTableTrack();
            console.log("pass checkAfterClickOnQueryTableTrack()");
        });
    });*/
    
    function loadHTMLFile(file) {
        const { JSDOM } = require("jsdom");
        //const options = null;
        const options = {
            resources: 'usable'/*,
            url: 'file:///C:/Users/Joyce/Documents/GitRepo_HabitTracker/HabitTracker/scripts/db-operations/'*/
        };
        return JSDOM.fromFile(file, options)
            .then((dom) => {
                console.log("file = " + file);
                //console.log("options.url = " + options.url);
                const { window } = dom.window;
                global.window = window;
                global.document = window.document;
                global.$ = require("jquery")(window);
            });
    }
    
    function checkBeforeClickOnQueryTableTrack() {
        console.log("Enter checkBeforeClickOnQueryTableTrack()");
        //console.log("body = " + document.body.outerHTML);
        console.log("body = " + document.body.outerHTML.substr(0, 50) + "...");
        console.log("s = ");
        console.log(HTML_CLASS.queryForm);
        const len = document.getElementsByClassName(HTML_CLASS.queryForm).length;
        const doms = Array.prototype.slice.call(document.getElementsByClassName(HTML_CLASS.queryForm));
        console.log("query-form length = " + doms.length);
        doms.forEach((dom) => {
            console.log("here 2");
            const style = window.getComputedStyle(dom, null);
            console.log("here 3");
            const display = style.getPropertyValue(CSS_PROPERTY.display);
            console.log("display = " + display);
            expect(display).to.eql(CSS_VALUE.none);
        })
    }
    
    function checkAfterClickOnQueryTableTrack() {
       
    }
})