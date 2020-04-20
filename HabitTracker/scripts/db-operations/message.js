import {HTML_ID} from "./html-properties.js";

function Message() {}

Message.showTableProcessFailMessage = function(err, process) {
    const msg = "unable to " + process + " table: " + "\n" + JSON.stringify(err, undefined, 2);
    document.getElementById(HTML_ID.textArea).innerHTML = msg;
};

Message.showTableProcessSuccessMessage = function(data, process) {
    const msg = process + "d table: " + "\n" + JSON.stringify(data, undefined, 2);
    document.getElementById(HTML_ID.textArea).innerHTML = msg;
};

export {
    Message
};