import {DomGenerator} from "../dom-generator.js";
import {HTML_CLASS, HTML_PROPERTY, HTML_TAG_NAME, EVENT} from "../html-properties.js";

function MonthlyCalendar(calendarObj) {
    const currentYear = calendarObj.year;
    const currentMonth = calendarObj.month - 1; //JavaScript "Date" object takes 0~11 as month number
    const currentLocale = calendarObj.locale;
    
    this.getDom = function() {
        const yearAndMonthDom = getYearAndMonthDom();
        const daysOfWeekDom = getDaysOfWeekDom();
        const weekDoms = getWeekDoms();
        
        const tableData = DomGenerator.getFlattenAry([yearAndMonthDom, daysOfWeekDom, weekDoms]);
        
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.table,
                [HTML_PROPERTY.className]: HTML_CLASS.month
            }, tableData
        );
        //console.log(`final dom = ${dom.outerHTML}`);
        this.addClickEventHandlerToMonthSwitcher(dom);
        return dom;
    };
    
    function getYearAndMonthDom() {
        const dataDom = getYearAndMonthDataDom();
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.tr
            }, [dataDom]
        );
        //console.log(`yearAndMonthDom=${dom.outerHTML}`);
        return dom;
    }
    
    function getYearAndMonthDataDom() {
        const prevMonthSwitcherDom = getPrevMonthSwitcherDom();
        const nextMonthSwitcherDom = getNextMonthSwitcherDom();
        const yearNumberDom = getYearNumberDom();
        const monthNameDom = getMonthNameDom();
        const spaceDom = document.createTextNode(" ");
        const multiSpaceDoms = DomGenerator.generateTextDoms(2, "    ");
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.td,
                [HTML_PROPERTY.className]: HTML_CLASS.yearAndMonth,
                [HTML_PROPERTY.colSpan]: 7
            }, [prevMonthSwitcherDom, multiSpaceDoms[0], yearNumberDom, spaceDom, monthNameDom, multiSpaceDoms[1], nextMonthSwitcherDom]
        );
        //console.log(`yearAndMonthDataDom=${dom.outerHTML}`);
        return dom;
    }
    
    function getPrevMonthSwitcherDom() {
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.span,
                [HTML_PROPERTY.className]: HTML_CLASS.prevMonthSwitcher,
                [HTML_PROPERTY.innerHTML]: "<"
            }, []
        );
        //console.log(`prevMonthSwitcherDom=${dom.outerHTML}`);
        return dom;
    }
    
    function getNextMonthSwitcherDom() {
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.span,
                [HTML_PROPERTY.className]: HTML_CLASS.nextMonthSwitcher,
                [HTML_PROPERTY.innerHTML]: ">"
            }, []
        );
        //console.log(`nextMonthSwitcherDom=${dom.outerHTML}`);
        return dom;
    }
    
    function getYearNumberDom() {
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.span,
                [HTML_PROPERTY.className]: HTML_CLASS.yearNumber,
                [HTML_PROPERTY.innerHTML]: currentYear
            }, []
        );
        //console.log(`yearNumberDom=${dom.outerHTML}`);
        return dom;
    }
    
    function getMonthNameDom() {
        const monthName = MonthlyCalendar.getMonthName(currentYear, currentMonth, currentLocale, MONTH_NAME_OPTION.long);
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.span,
                [HTML_PROPERTY.className]: HTML_CLASS.monthName,
                [HTML_PROPERTY.innerHTML]: monthName
            }, []
        );
        //console.log(`monthNameDom=${dom.outerHTML}`);
        return dom;
    }
    
    function getDaysOfWeekDom() {
        const daysOfWeek = getDaysOfWeek();
        const dayDoms = getDayDoms(daysOfWeek);
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.tr,
                [HTML_PROPERTY.className]: HTML_CLASS.daysOfWeek
            }, dayDoms
        );
        
        return dom;
    }
    
    function getDayDoms(daysOfWeek) {
        const doms = daysOfWeek.map(day => {
            const dom = DomGenerator.generateDOMWithChildren(
                {
                    [HTML_PROPERTY.tagName]: HTML_TAG_NAME.td,
                    [HTML_PROPERTY.innerHTML]: day
                }, []
            );
            
            return dom;
        });
        
        return doms;
    }
    
    function getDaysOfWeek() {
        const fromSundayToSaturday = [
            "2020-04-05",
            "2020-04-06",
            "2020-04-07",
            "2020-04-08",
            "2020-04-09",
            "2020-04-10",
            "2020-04-11"
        ];
        const options = { weekday: "short" };
        let daysOfWeek = fromSundayToSaturday.reduce((ary, date) => {
            const dateObj = new Date(date);
            const tmpDay = dateObj.toLocaleDateString(currentLocale, options);
            const day = removeUnwantedCharacter(tmpDay);
            ary.push(day);
            return ary;
        }, []);
        
        return daysOfWeek;
    }
    
    function removeUnwantedCharacter(tmpDay) {
        const unwantedCharacter = "週";　
        return tmpDay.replace(unwantedCharacter, "");
    }
    
    function getWeekDoms() {
        const dateDoms = getDateDoms();
        
        let oneWeekDateDoms = [];
        const weekDoms = dateDoms.reduce((result, dateDom) => {
            oneWeekDateDoms.push(dateDom);
            if(oneWeekDateDoms.length == 7) {
                const dom = DomGenerator.generateDOMWithChildren(
                    {
                        [HTML_PROPERTY.tagName]: HTML_TAG_NAME.tr
                    }, oneWeekDateDoms
                );
                result.push(dom);
                
                oneWeekDateDoms = [];
            }
            return result;
        }, []);
        
        return weekDoms;
    }
    
    function getDateDoms() {
        const tmpDateObj = getFirstDateOfCalendar();
        const totalDaysInCalendar = 42;
        let doms = [];
        for(let i=0; i<totalDaysInCalendar; i++) {
            let htmlClass;
            const relativeMonth = getRelativeMonth(tmpDateObj);
            const monthDiff = relativeMonth - currentMonth;
            switch(monthDiff) {
                case -1:
                    htmlClass = HTML_CLASS.prevMonthDate;
                    break;
                case 0:
                    htmlClass = HTML_CLASS.currentMonthDate;
                    break;
                case 1:
                    htmlClass = HTML_CLASS.nextMonthDate;
                    break;
                default:
                    throw `Unexpect monthDiff(${monthDiff}) = currentMonth(${currentMonth}) - tmpYear(${relativeMonth})`;
                    return;
            }
            
            const dateNumberDom = getDateNumberDom(tmpDateObj.getDate());
            const dom = DomGenerator.generateDOMWithChildren(
                {
                    [HTML_PROPERTY.tagName]: HTML_TAG_NAME.td,
                    [HTML_PROPERTY.className]: htmlClass
                }, [dateNumberDom]
            );
            
            doms.push(dom);
            
            tmpDateObj.setDate(tmpDateObj.getDate() + 1);
        }
        
        return doms;
    }
    
    function getFirstDateOfCalendar() {
        const dateObj = getFirstDateObjOfCurrentMonth();
        const dayDiff = dateObj.getDay() == 0 ? 7 : dateObj.getDay();
        dateObj.setDate(dateObj.getDate() - dayDiff);
        //console.log(`first date = ${dateObj.getDate()}`);
        return dateObj;
    }
    
    function getFirstDateObjOfCurrentMonth() {
        const dateObj = new Date(currentYear, currentMonth, 1);
        
        return dateObj;
    }
    
    function getRelativeMonth(dateObj) {
        const yearDiff = dateObj.getFullYear() - currentYear;
        switch(yearDiff) {
            case -1:
                return dateObj.getMonth() - 12;
                break;
            case 0:
                return dateObj.getMonth()
                break;
            case 1:
                return dateObj.getMonth() + 12;
                break;
            default:
                throw `Unexpect yearDiff(${yearDiff}) = tmpYear(${dateObj.getYear()}) - currentYear(${currentYear})`
                break;
        }
    }
    
    function getDateNumberDom(dateNumber) {
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.span,
                [HTML_PROPERTY.innerHTML]: dateNumber,
                [HTML_PROPERTY.className]: HTML_CLASS.dateNumber
            }, []
        );
        
        return dom;
    }
    
    this.addClickEventHandlerToMonthSwitcher = function(dom) {
        addClickEventHandlerToPrevMonthSwitcher(dom);
        //addClickEventHandlerToNextMonthSwitcher(dom);
    };
    
    function addClickEventHandlerToPrevMonthSwitcher(dom) {
        const switcher = $(dom).find("."+HTML_CLASS.prevMonthSwitcher);
        
        $(switcher).on(EVENT.click, function() {
            const prevMonthDom = getPrevMonthDom();
            $(dom).prop(HTML_PROPERTY.outerHTML, $(prevMonthDom).prop(HTML_PROPERTY.outerHTML));
        });
    }
    
    function getPrevMonthDom() {
        const dateObj = getPrevMonthDateObj();
        const calendarObj = getCalendarObj(dateObj);
        const dom = new MonthlyCalendar(calendarObj).getDom();
        //console.log(`prevMonthDom=${prevMonthDom.outerHTML}`);
        return dom;
    }
    
    function getPrevMonthDateObj() {
        const dateObj = new Date(currentYear, currentMonth, 1);
        dateObj.setMonth(dateObj.getMonth() - 1);
        //printMonthName(dateObj);
        return dateObj;
    }
    
    function printMonthName(dateObj) {
        console.log(`monthName = ${MonthlyCalendar.getMonthName(dateObj.getFullYear(), dateObj.getMonth(), currentLocale, MONTH_NAME_OPTION.long)}`);
    }
    
    function getCalendarObj(dateObj) {
        const calendarObj = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            locale: currentLocale
        };
        
        return calendarObj;
    }
}

MonthlyCalendar.getMonthName = function(year, month, locale, monthNameOption) {
    const dateObj = new Date(year, month, 1);
    const options = { month: monthNameOption };
    const monthName = dateObj.toLocaleDateString(locale, options);

    return monthName;
}

const MONTH_NAME_OPTION = {
    long: "long",
    short: "short"
};

export {
    MonthlyCalendar
};