import {loadHTML} from "./common-func-for-tests.js";
import {Calendar, CALENDAR_TYPE} from "../scripts/src/calendars/calendar.js";
import {MonthlyCalendar} from "../scripts/src/calendars/monthly-calendar.js";
import {YearlyCalendar} from "../scripts/src/calendars/yearly-calendar.js";
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

describe(`getCalendar({year, month, locale}, CALENDAR_TYPE.monthly)`, function() {
    it(`return a MonthlyCalendar object`, function() {
        const dateObj = {
            year: 2020,
            month: 4,
            locale: undefined
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
    const numOfMonthName = dom.getElementsByClassName(HTML_CLASS.monthName).length;
    expect(numOfMonthName).to.eql(1);
    
    const numOfPrevMonthDate = dom.getElementsByClassName(HTML_CLASS.prevMonthDate).length;
    expect(numOfPrevMonthDate).to.eql(3);
    
    const numOfNextMonthDate = dom.getElementsByClassName(HTML_CLASS.nextMonthDate).length;
    expect(numOfNextMonthDate).to.eql(9);
    
    const numOfCurrentMonthDate = dom.getElementsByClassName(HTML_CLASS.currentMonthDate).length;
    expect(numOfCurrentMonthDate).to.eql(30);
    
    const numOfTableRow = dom.getElementsByTagName(HTML_TAG_NAME.tr).length;
    expect(numOfTableRow).to.eql(8);
}

describe(`(MonthlyCalendar)getDom() (with different locales)`, function() {
    it(`get different dom contents when locales are different`, function() {
        checkTheFirstDayOfWeekWithLocale(LOCALE.enUS);
        checkTheFirstDayOfWeekWithLocale(LOCALE.zhTW);
        checkTheFirstDayOfWeekWithLocale(LOCALE.jaJP);
        checkTheFirstDayOfWeekWithLocale(undefined);
    })
})

function checkTheFirstDayOfWeekWithLocale(locale) {
    const dateObj = {
        year: 2020,
        month: 4,
        locale: locale
    };
    const dom = new Calendar().getCalendar(dateObj, CALENDAR_TYPE.monthly).getDom();
    const daysOfWeek = $(dom).find("."+HTML_CLASS.daysOfWeek).first();
    const firstDay = $(daysOfWeek).children(":first").prop("innerHTML");
    
    switch(locale) {
        case LOCALE.enUS:
            expect(firstDay).to.eql("Sun");
            break;
        case LOCALE.zhTW:
            expect(firstDay).to.eql("日");
            break;
        case LOCALE.jaJP:
            expect(firstDay).to.eql("日");
            break;
        case undefined:
            expect(firstDay).to.eql("日");
            break;
        default:
            throw `Unchecked locale: [${locale}]`;
            break;
    }
}

describe(`getCalendar({year, locale}, CALENDAR_TYPE.yearly)`, function() {
    it(`return a YearlyCalendar object`, function() {
        const dateObj = {
            year: 2020,
            locale: LOCALE.enUS
        };
        const calendar = new Calendar().getCalendar(dateObj, CALENDAR_TYPE.yearly);
        expect(calendar instanceof YearlyCalendar).to.be.true;
    })
})

describe(`(YearlyCalendar)getDom()`, function() {
    it(`get the dom of the yearly calendar`, function() {
        const dateObj = {
            year: 2020,
            locale: LOCALE.enUS
        };
        const calendar = new Calendar().getCalendar(dateObj, CALENDAR_TYPE.yearly);
        const dom = calendar.getDom();
        checkYearlyCalendarDom(dom);
    })
})

function checkYearlyCalendarDom(dom) {
    const numOfClassYearNumber = $(dom).find("."+HTML_CLASS.yearNumber).length;
    expect(numOfClassYearNumber).to.eql(1);
    
    const numOfClassMonth = $(dom).find("."+HTML_CLASS.month).length;
    expect(numOfClassMonth).to.eql(12);
    
    const numOfCurrentMonthDate = $(dom).find("."+HTML_CLASS.currentMonthDate).length;
    expect(numOfCurrentMonthDate).to.eql(366);
    
    const numOfAllDate = $(dom).find(`td[class$="-month-date"]`).length
    
    expect(numOfAllDate).to.eql(504);
}