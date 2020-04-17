import {loadHTML} from "./common-func-for-tests.js";
import {MonthlyCalendar} from "../scripts/src/calendars/monthly-calendar.js";
import {Marker} from "../scripts/src/marker.js";
import {HTML_CLASS, HTML_TAG_NAME, HTML_PROPERTY, CANVAS} from "../scripts/src/html-properties.js";
import {Calendar, CALENDAR_TYPE, LOCALE} from "../scripts/src/calendars/calendar.js";

const expect = require("chai").expect;

beforeEach(loadHTML);

describe(`test clicking on dateNumberDom`, function() {
    it(`1) click: draw a "X" 2) click again: the "X" disappear`, function() {
        const calendarObj = {
            year: 2020,
            month: 4,
            locale: LOCALE.english
        }
        const dom = new Calendar().getCalendar(calendarObj, CALENDAR_TYPE.monthly).getDom();
        document.body.appendChild(dom);
        checkMarkingOnCalendar();
        checkUnmarkingOnCalendar();
    })
})

function checkMarkingOnCalendar() {
    expect($(document).find(HTML_TAG_NAME.canvas).length).to.eql(0);
    
    const dateDom = getFirstCurrentMonthDateDom();
    $(dateDom).click();
    
    expect($(document).find(HTML_TAG_NAME.canvas).length).to.eql(1);
}

function getFirstCurrentMonthDateDom() {
    return $(document).find("."+HTML_CLASS.currentMonthDate).first();
}

function getCanvasDom() {
    return $(document).find(HTML_TAG_NAME.canvas).first();
}

function checkUnmarkingOnCalendar() {
    expect($(document).find(HTML_TAG_NAME.canvas).length).to.eql(1);
    
    const dateDom = getFirstCurrentMonthDateDom();
    $(dateDom).click();
    
    expect($(document).find(HTML_TAG_NAME.canvas).length).to.eql(0);
}