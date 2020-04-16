import {loadHTML} from "./common-func-for-tests.js";
import {Calendar, CALENDAR_TYPE, LOCALE} from "../scripts/src/calendars/calendar.js";
import {MonthlyCalendar} from "../scripts/src/calendars/monthly-calendar.js";
import {HTML_CLASS, HTML_TAG_NAME, HTML_PROPERTY} from "../scripts/src/html-properties.js";

const expect = require("chai").expect;

beforeEach(loadHTML);

describe(`new Calendar(dateObj, CALENDAR_TYPE.monthly)`, function() {
    it(`return a MonthlyCalendar`, function() {
        const dateObj = {
            year: 2020,
            month: 4,
            locale: LOCALE.english
        };
        const calendar = new Calendar().getCalendar(dateObj, CALENDAR_TYPE.monthly);
        expect(calendar instanceof MonthlyCalendar).to.be.true;
    })
})

describe(`getDom()`, function() {
    it(`get the dom of MonthlyCalendar`, function() {
        const dateObj = {
            year: 2020,
            month: 4,
            locale: LOCALE.english
        };
        const calendar = new Calendar().getCalendar(dateObj, CALENDAR_TYPE.monthly);
        const dom = calendar.getDom();
        checkMonthlyCalendarDom(dom);
    })
})

function checkMonthlyCalendarDom(dom) {
    //console.log(dom.outerHTML);
    
    const numOfPrevMonthSwitcher = dom.getElementsByClassName(HTML_CLASS.prevMonthSwitcher).length;
    expect(numOfPrevMonthSwitcher).to.eql(1);
    
    const numOfNextMonthSwitcher = dom.getElementsByClassName(HTML_CLASS.nextMonthSwitcher).length;
    expect(numOfNextMonthSwitcher).to.eql(1);
    
    const numOfYearNumber = dom.getElementsByClassName(HTML_CLASS.yearNumber).length;
    expect(numOfYearNumber).to.eql(1);
    
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

describe(`getDom() (with different locales)`, function() {
    it(`get different dom contents when locales are different`, function() {
        checkTheFirstDayOfWeekWithLocale(LOCALE.english);
        checkTheFirstDayOfWeekWithLocale(LOCALE.chinese);
        checkTheFirstDayOfWeekWithLocale(LOCALE.japanese);
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
        case LOCALE.english:
            expect(firstDay).to.eql("Sun");
            break;
        case LOCALE.chinese:
            expect(firstDay).to.eql("日");
            break;
        case LOCALE.japanese:
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

describe(`test clicking on prevMonthSwitcher & nextMonthSwitcher`, function() {
    it(`switch the monthly calendar to previous/next month`, function() {
        const dateObj = {
            year: 2020,
            month: 12,
            locale: LOCALE.english
        }
        const calendar = new Calendar().getCalendar(dateObj, CALENDAR_TYPE.monthly);
        const dom = calendar.getDom();
        checkSwitchToPrevAndNextMonth(dom);
    })
})

function checkSwitchToPrevAndNextMonth(dom) {
    document.body.appendChild(dom);
    
    checkCurrentMonth(document);
    
    $(document).find("."+HTML_CLASS.nextMonthSwitcher).click();
    checkSwitchToNextMonth(document);
    
    $(document).find("."+HTML_CLASS.prevMonthSwitcher).click();
    checkSwitchToPrevMonth(document);
}

function checkCurrentMonth(dom) {
    const monthName = $(dom).find("."+HTML_CLASS.monthName).prop(HTML_PROPERTY.innerHTML);
    expect(monthName).to.eql("December");
    
    const yearNumber = $(dom).find("."+HTML_CLASS.yearNumber).prop(HTML_PROPERTY.innerHTML);
    expect(yearNumber).to.eql("2020");
}

function checkSwitchToNextMonth(dom) {
    const monthName = $(dom).find("."+HTML_CLASS.monthName).prop(HTML_PROPERTY.innerHTML);
    expect(monthName).to.eql("January");
    
    const yearNumber = $(dom).find("."+HTML_CLASS.yearNumber).prop(HTML_PROPERTY.innerHTML);
    expect(yearNumber).to.eql("2021");
    
    const currentMonthDateNum = $(dom).find("."+HTML_CLASS.currentMonthDate).length;
    expect(currentMonthDateNum).to.eql(31);
    
    const prevMonthDateNum = $(dom).find("."+HTML_CLASS.prevMonthDate).length;
    expect(prevMonthDateNum).to.eql(5);
    
    const nextMonthDateNum = $(dom).find("."+HTML_CLASS.nextMonthDate).length;
    expect(nextMonthDateNum).to.eql(6);
    
    const allDateNum = $(dom).find(`td[class$="-month-date"]`).length;
    expect(allDateNum).to.eql(42);
}

function checkSwitchToPrevMonth(dom) {
    const monthName = $(dom).find("."+HTML_CLASS.monthName).prop(HTML_PROPERTY.innerHTML);
    expect(monthName).to.eql("December");
    
    const yearNumber = $(dom).find("."+HTML_CLASS.yearNumber).prop(HTML_PROPERTY.innerHTML);
    expect(yearNumber).to.eql("2020");
    
    const currentMonthDateNum = $(dom).find("."+HTML_CLASS.currentMonthDate).length;
    expect(currentMonthDateNum).to.eql(31);
    
    const prevMonthDateNum = $(dom).find("."+HTML_CLASS.prevMonthDate).length;
    expect(prevMonthDateNum).to.eql(2);
    
    const nextMonthDateNum = $(dom).find("."+HTML_CLASS.nextMonthDate).length;
    expect(nextMonthDateNum).to.eql(9);
    
    const allDateNum = $(dom).find(`td[class$="-month-date"]`).length;
    expect(allDateNum).to.eql(42);
}