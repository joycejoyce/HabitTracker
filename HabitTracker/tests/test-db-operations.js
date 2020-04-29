import "regenerator-runtime/runtime.js";
import {chai, expect, printErrorStack} from "./common-func-for-tests.js";
import {TBL_TRACK_COLUMN, TABLE_NAME} from "../scripts/db-operations/constants/db-info.js";
import {HTML_ID, HTML_CLASS, CSS_PROPERTY, CSS_VALUE} from "../scripts/db-operations/constants/html-properties.js";

let loadDoc;
let window, document, $;

describe(`GUI of querying DB data`, () => {
    beforeEach(async () => {
        const file = "./scripts/db-operations/db-operations.html";
        loadDoc = await loadFile(file);
    });

    it(`choose table "track" would show ${HTML_ID.trackTableQueryForm}`, async () => {
        await loadDoc;
        window.onload = (event) => {
            try {
                checkBeforeClickOnQueryTableTrack();
                
                const queryList = document.getElementById(HTML_ID.queryTableTrack);
                $(queryList).click();

                checkAfterClickOnQueryTableTrack();
            }
            catch(err) {
                printErrorStack(err);
            }
        }
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
        const dom = document.getElementById(HTML_ID.trackTableQueryForm);
        const display = getStyle(CSS_PROPERTY.display, dom);
        console.log("(after)display = " + display);
        expect(display).to.eql(CSS_VALUE.block);
    }
})

function loadFile(file) {
    const { JSDOM } = require("jsdom");
    const options = {
        resources: "usable",
        runScripts: "dangerously"
    };
    return JSDOM.fromFile(file, options)
        .then((dom) => {
            window = dom.window;
            document = window.document;
            $ = require("jquery")(window);
        });
}