import {DomGenerator} from "../dom-generator.js";
import {HTML_CLASS, HTML_PROPERTY, HTML_TAG_NAME} from "../html-properties.js";

function MonthlyCalendar(inputDateObj) {
    const currentLocale = inputDateObj.locale;
    const currentYear = inputDateObj.year;
    const currentMonth = inputDateObj.month - 1;
    
    this.getDom = function() {
        const monthNameDom = getMonthNameDom();
        const daysOfWeekDom = getDaysOfWeekDom();
        const weekDoms = getWeekDoms();
        
        const tableData = DomGenerator.getFlattenAry([monthNameDom, daysOfWeekDom, weekDoms]);
        
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.table,
                [HTML_PROPERTY.className]: HTML_CLASS.month
            }, tableData
        );
        //console.log(`final dom = ${dom.outerHTML}`);
        return dom;
    };
    
    function getMonthNameDom() {
        const dataDom = getMonthNameDataDom();
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.tr,
            }, [dataDom]
        );
        
        return dom;
    }
    
    function getMonthNameDataDom() {
        const monthName = getMonthName();
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.td,
                [HTML_PROPERTY.className]: HTML_CLASS.monthName,
                [HTML_PROPERTY.innerHTML]: monthName,
                [HTML_PROPERTY.colSpan]: 7
            }, []
        );
        
        return dom;
    }
    
    function getMonthName() {
        const dateObj = new Date(currentYear, currentMonth, 1);
        const options = { month: "long" };
        const monthName = dateObj.toLocaleDateString(currentLocale, options);
        
        return monthName;
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
            //dom.innerHTML = tmpDateObj.getDate();
            
            doms.push(dom);
            
            tmpDateObj.setDate(tmpDateObj.getDate() + 1);
        }
        
        return doms;
    }
    
    function getFirstDateOfCalendar() {
        const dateObj = getFirstDateObjOfCurrentMonth();
        const dayDiff = dateObj.getDay();
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
}

export {
    MonthlyCalendar
};