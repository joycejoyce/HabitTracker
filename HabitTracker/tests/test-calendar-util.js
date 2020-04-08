import {loadHTML} from "./common-func-for-tests.js";
import {Calendar, CALENDAR_TYPE} from "../scripts/src/calendars/calendar.js";
import {MonthlyCalendar} from "../scripts/src/calendars/monthly-calendar.js";
import {HTML_CLASS, HTML_TAG_NAME} from "../scripts/src/html-properties.js";

const expect = require("chai").expect;

const LOCALE = {
    enUS: "en-US",
    zhTW: "zh-TW",
    jaJP: "ja-JP"
};

beforeEach(loadHTML);

describe(`new Calendar()`, function() {
    it(`return a Calendar object`, function() {
        const calendar = new Calendar();
        expect(calendar instanceof Calendar).to.be.true;
    })
})

describe(`getCalendar({year, month}, CALENDAR_TYPE.monthly)`, function() {
    it(`return a MonthlyCalendar object`, function() {
        const dateObj = {
            year: 2020,
            month: 4,
            firstOf7Days: 0
        };
        const calendar = new Calendar().getCalendar(dateObj, CALENDAR_TYPE.monthly);
        expect(calendar instanceof MonthlyCalendar).to.be.true;
    })
})

describe(`(MonthlyCalendar)getDom()`, function() {
    it(`get the dom of the monthly calendar`, function() {
        const dateObj = {
            year: 2020,
            month: 4,
            locale: LOCALE.enUS
        };
        const calendar = new Calendar().getCalendar(dateObj, CALENDAR_TYPE.monthly);
        const dom = calendar.getDom();
        checkMonthlyCalendarDom(dom);
    })
})

function checkMonthlyCalendarDom(dom) {
    const numOfOtherMonthDate = dom.getElementsByClassName(HTML_CLASS.otherMonthDate).length;
    expect(numOfOtherMonthDate).to.eql(12);
    
    const numOfCurrentMonthDate = dom.getElementsByClassName(HTML_CLASS.currentMonthDate).length;
    expect(numOfCurrentMonthDate).to.eql(30);
    
    const numOfTableRow = dom.getElementsByTagName(HTML_TAG_NAME.tr).length;
    expect(numOfTableRow).to.eql(7);
}

describe(`(MonthlyCalendar)getDom() (with different locales)`, function() {
    it(`get different dom contents when locales are different`, function() {
        checkTheFirstDayOfWeekWithLocale(LOCALE.enUS);
        checkTheFirstDayOfWeekWithLocale(LOCALE.zhTW);
        checkTheFirstDayOfWeekWithLocale(LOCALE.jaJP);
    })
})

function checkTheFirstDayOfWeekWithLocale(locale) {
    const dateObj = {
        year: 2020,
        month: 4,
        locale: locale
    };
    const dom = new Calendar().getCalendar(dateObj, CALENDAR_TYPE.monthly);
    const firstDayOfWeek = dom.getElementsByClassName(HTML_CLASS.daysOfWeek)[0].innerHTML;
    
    switch(locale) {
        case LOCALE.enUS:
            expect(firstDayOfWeek).to.eql("Sun");
            break;
        case LOCALE.zhTW:
            expect(firstDayOfWeek).to.eql("日");
            break;
        case LOCALE.jaJP:
            expect(firstDayOfWeek).to.eql("日");
            break;
        default:
            throw `Unchecked locale: [${locale}]`;
            break;
    }
}