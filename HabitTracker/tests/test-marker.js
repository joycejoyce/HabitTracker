import {loadHTML} from "./common-func-for-tests.js";
import {Calendar, CALENDAR_TYPE, LOCALE} from "../scripts/src/calendars/calendar.js";
import {MonthlyCalendar} from "../scripts/src/calendars/monthly-calendar.js";
import {HTML_CLASS, HTML_TAG_NAME, HTML_PROPERTY} from "../scripts/src/html-properties.js";

const expect = require("chai").expect;

beforeEach(loadHTML);

describe(`click on ${HTML_CLASS.currentMonthDate}`, function() {
    it(`mark a cross sign (X) on the dom`, function() {
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
    expect($(document).find("."+HTML_CLASS.crossSign).length).to.eql(0);
    
    const dateDom = getFirstCurrentMonthDateDom();
    $(dateDom).click();
    
    expect($(document).find("."+HTML_CLASS.crossSign).length).to.eql(1);
}

function getFirstCurrentMonthDateDom() {
    return $(document).find("."+HTML_CLASS.currentMonthDate).first();
}

function checkUnmarkingOnCalendar() {
    expect($(document).find("."+HTML_CLASS.crossSign).length).to.eql(1);
    
    const dateDom = getFirstCurrentMonthDateDom();
    $(dateDom).click();
    
    expect($(document).find("."+HTML_CLASS.crossSign).length).to.eql(0);
}