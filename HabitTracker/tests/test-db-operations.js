import {TBL_TRACK_COLUMN, TABLE_NAME} from "../scripts/db-operations/constants/db-info.js";
import {HTML_ID, HTML_CLASS, CSS_PROPERTY, CSS_VALUE} from "../scripts/db-operations/constants/html-properties.js";
/*import {Loader, ModuleNamespace} from "../node_modules/es-module-loader/core/loader-polyfill.js";*/

const expect = require("chai").expect;
let myWindow, myDoc, my$;

/*let loader = new Loader();
loader[Loader.resolve] = function (key, parent) {
  // intercept the load of "x"
  if (key === 'x') {
    this.registry.set('x', new ModuleNamespace({ some: 'exports' }));
    return key;
  }
  return Loader.prototype[Loader.resolve](key, parent);
};
 
loader.import('x').then(function (m) {
  console.log(m.some);
});*/

describe(`GUI of querying DB data`, () => {
    const file = "./scripts/db-operations/db-operations.html";
    let loadDoc;
    //beforeEach(() => { loadDoc = loadHTMLFile(file) });
    beforeEach(() => {
        loadDoc = loadHTMLFile(file)
            .then(() => {
                const scriptEl = myDoc.createElement("script");
                scriptEl.setAttribute("type", "module");
                const text = `import {EventHandler} from "./tools/event-handler.js"; new EventHandler().addEventHandlers();`;
                scriptEl.textContent = text;
                console.log("scriptEl = " + scriptEl.outerHTML);
                myDoc.body.appendChild(scriptEl);
            });
    });
    /*beforeEach(() => { 
        loadDoc = loadHTMLFile(file)
                    .then(() => {
                        console.log("1");
                        loader.import("EventHandler");
                        console.log("2");
                    })
                    .then((EventHandler) => {
                        console.log("3");
                        new EventHandler().addEventHandlers();
                        console.log("4");
                    });
    });*/
    
    /*it(`test jsdom`, () => {
        loadDoc.then(() => {
            myWindow.addEventListener("load", () => {
                checkBeforeClickOnQueryTableTrack();
            }, false);
        });
    });*/
    
    it(`choose table "track", show:\n1. ${TBL_TRACK_COLUMN.userId}\n2. ${TBL_TRACK_COLUMN.habitId}\n3. ${TBL_TRACK_COLUMN.date}`, () => {
        loadDoc.then(() => {
            myWindow.addEventListener("load", () => {
                checkBeforeClickOnQueryTableTrack();
                
                const queryList = myDoc.getElementById(HTML_ID.queryTableTrack);
                my$(queryList).click();

                checkAfterClickOnQueryTableTrack();
            });
        });
    });
    
    function checkBeforeClickOnQueryTableTrack() {
        const doms = Array.prototype.slice.call(myDoc.getElementsByClassName(HTML_CLASS.queryForm));
        doms.forEach((dom) => {
            const display = getStyle(CSS_PROPERTY.display, dom);
            console.log("(before)display = " + display);
            expect(display).to.eql(CSS_VALUE.none);
        })
    }
    
    function getStyle(name, dom) {
        const computedStyle = myWindow.getComputedStyle(dom);
        return computedStyle.getPropertyValue(name);
    }
    
    function checkAfterClickOnQueryTableTrack() {
        const dom = myDoc.getElementById(HTML_ID.trackTableQueryForm);
        const display = getStyle(CSS_PROPERTY.display, dom);
        console.log("(after)display = " + display);
        expect(true).to.be.true;
        console.log("true = true");
        expect(display).to.eql(CSS_VALUE.block);
        console.log("done");
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
            myWindow = dom.window;
            myDoc = myWindow.document;
            my$ = require("jquery")(myWindow);
        });
}