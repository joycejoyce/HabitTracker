import {DomGenerator, REPLACE_OBJ} from "../dom-generator.js";
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
        addClickEventHandlerToMonthSwitchers(dom);
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
        const monthNumberDom = getMonthNumberDom();
        const monthNameDom = getMonthNameDom();
        const spaceDom = document.createTextNode(" ");
        const multiSpaceDoms = DomGenerator.generateTextDoms(2, "    ");
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.td,
                [HTML_PROPERTY.className]: HTML_CLASS.yearAndMonth,
                [HTML_PROPERTY.colSpan]: 7
            }, [prevMonthSwitcherDom, multiSpaceDoms[0], yearNumberDom, spaceDom, monthNumberDom, monthNameDom, multiSpaceDoms[1], nextMonthSwitcherDom]
        );
        $(dom).find("."+HTML_CLASS.monthNumber).hide();
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
    
    function getMonthNumberDom() {
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.span,
                [HTML_PROPERTY.className]: HTML_CLASS.monthNumber,
                [HTML_PROPERTY.innerHTML]: currentMonth
            }, []
        );
        
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
                        [HTML_PROPERTY.tagName]: HTML_TAG_NAME.tr,
                        [HTML_PROPERTY.className]: HTML_CLASS.week
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
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.div,
                [HTML_PROPERTY.innerHTML]: dateNumber,
                [HTML_PROPERTY.className]: HTML_CLASS.dateNumber
            }, []
        );
        
        return dom;
    }
    
    function addClickEventHandlerToMonthSwitchers(dom) {
        addClickEventHandlerToPrevMonthSwitcher(dom);
        addClickEventHandlerToNextMonthSwitcher(dom);
    }

    function addClickEventHandlerToPrevMonthSwitcher(dom) {
        $(dom)
            .find("."+HTML_CLASS.prevMonthSwitcher)
            .on(EVENT.click,
                function() {
                    const prevMonthDom = getOtherMonthDom(-1);
                    replaceWithOtherMonthDom(prevMonthDom);
                }
            );
    }
    
    function getOtherMonthDom(monthDiff) {
        const otherMonthDateObj = getOtherMonthDateObj(monthDiff);
        const otherMonthCalendarObj = getCalendarObj(otherMonthDateObj, calendarObj.locale);
        const dom = new MonthlyCalendar(otherMonthCalendarObj).getDom();
        //console.log(`prevMonthDom=${dom.outerHTML}`);
        return dom;
    }
    
    function getOtherMonthDateObj(monthDiff) {
        const yearNumber = $(document).find("."+HTML_CLASS.yearNumber).prop(HTML_PROPERTY.innerHTML);
        const monthNumber = $(document).find("."+HTML_CLASS.monthNumber).prop(HTML_PROPERTY.innerHTML);
        const dateObj = new Date(yearNumber, monthNumber, 1);
        dateObj.setMonth(dateObj.getMonth() + monthDiff);
        //MonthlyCalendar.printDateObj(dateObj, currentLocale);
        return dateObj;
    }
    
    function getCalendarObj(dateObj, locale) {
        const calendarObj = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            locale: locale
        };
        //MonthlyCalendar.printCalendarObj(calendarObj);
        return calendarObj;
    }
    
    function replaceWithOtherMonthDom(otherMonthDom) {
        let replaceObj = {
            [REPLACE_OBJ.targetType]: HTML_PROPERTY.className,
            [REPLACE_OBJ.property]: HTML_PROPERTY.innerHTML
        }
        
        replaceObj[REPLACE_OBJ.targetName] = HTML_CLASS.yearNumber;
        DomGenerator.replaceHTMLProperty(otherMonthDom, replaceObj);
        
        replaceObj[REPLACE_OBJ.targetName] = HTML_CLASS.monthNumber;
        DomGenerator.replaceHTMLProperty(otherMonthDom, replaceObj);
        
        replaceObj[REPLACE_OBJ.targetName] = HTML_CLASS.monthName;
        DomGenerator.replaceHTMLProperty(otherMonthDom, replaceObj);
        
        replaceWithOtherMonthWeeks(otherMonthDom);
    }
    
    function replaceWithOtherMonthWeeks(otherMonthDom) {
        $(document).find("."+HTML_CLASS.week).remove();
        $(otherMonthDom).find("."+HTML_CLASS.week).each((index, dom) => {
            $(document).find("."+HTML_CLASS.month).append(dom);
        });
    }
    
    function addClickEventHandlerToNextMonthSwitcher(dom) {
        $(dom)
            .find("."+HTML_CLASS.nextMonthSwitcher)
            .on(EVENT.click,
                function() {
                    const nextMonthDom = getOtherMonthDom(1);
                    replaceWithOtherMonthDom(nextMonthDom);
                }
            );
    }
}

MonthlyCalendar.getMonthName = function(year, month, locale, monthNameOption) {
    const dateObj = new Date(year, month, 1);
    const options = { month: monthNameOption };
    const monthName = dateObj.toLocaleDateString(locale, options);

    return monthName;
};

MonthlyCalendar.printDateObj = function(dateObj, locale) {
    console.log(`=== DateObj [start] ===`);
    console.log(`FullYear = ${dateObj.getFullYear()}`);
    console.log(`Month = ${dateObj.getMonth()}`);
    console.log(`MonthName = ${MonthlyCalendar.getMonthName(dateObj.getFullYear(), dateObj.getMonth(), locale, MONTH_NAME_OPTION.long)}`);
    console.log(`=== DateObj [end] ===`);
};

MonthlyCalendar.printCalendarObj = function(calendarObj) {
    console.log(`=== CalendarObj [start] ===`);
    console.log(`locale = ${calendarObj.locale}`);
    console.log(`year = ${calendarObj.year}`);
    console.log(`month = ${calendarObj.month}`);
    console.log(`=== CalendarObj [end] ===`);
}

const MONTH_NAME_OPTION = {
    long: "long",
    short: "short"
};

export {
    MonthlyCalendar
};