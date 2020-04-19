import {loadHTML} from "./common-func-for-tests.js";
import {Calendar, CALENDAR_TYPE, LOCALE} from "../scripts/src/calendars/calendar.js";
import {MonthlyCalendar} from "../scripts/src/calendars/monthly-calendar.js";
import {HTML_CLASS, HTML_TAG_NAME, HTML_PROPERTY} from "../scripts/src/html-properties.js";

const expect = require("chai").expect;

beforeEach(loadHTML);

describe(`click on className=${HTML_CLASS.currentMonthDate} DOM`, function() {
    it(`mark/cancel a cross sign (X) on the dom`, function() {
        createCalendar()
        checkMarkingOnCalendar();
        checkUnmarkingOnCalendar();
    })
})

function createCalendar() {
    const calendarObj = {
        year: 2020,
        month: 4,
        locale: LOCALE.english
    }
    const dom = new Calendar().getCalendar(calendarObj, CALENDAR_TYPE.monthly).getDom();
    document.body.appendChild(dom);
}

function checkMarkingOnCalendar() {
    expect($(document).find("."+HTML_CLASS.crossSign).length).to.eql(0);
    
    const dateDom = getNthCurrentMonthDateDom(1);
    $(dateDom).click();
    
    expect($(document).find("."+HTML_CLASS.crossSign).length).to.eql(1);
}

function getNthCurrentMonthDateDom(n) {
    return $(document).find("."+HTML_CLASS.currentMonthDate+":nth-child("+n.toString()+")").first();
}

function checkUnmarkingOnCalendar() {
    expect($(document).find("."+HTML_CLASS.crossSign).length).to.eql(1);
    
    const dateDom = getNthCurrentMonthDateDom(1);
    $(dateDom).click();
    
    expect($(document).find("."+HTML_CLASS.crossSign).length).to.eql(0);
}

/*describe(`click on className=${HTML_CLASS.currentMonthDate} DOM`, function() {
    it(`record marking to DB`, function() {
        createCalendar();
        
        const clickTimes = 5;
        let doms = [];
        for(let i=0; i<clickTimes; i++) {
            doms.push(getNthCurrentMonthDateDom(i));
        }
        
        $(doms).each((index, dom) => {
            $(dom).click();
        });
        
        
    })
})*/