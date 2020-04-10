import {DomGenerator} from "../dom-generator.js";
import {HTML_CLASS, HTML_PROPERTY, HTML_TAG_NAME} from "../html-properties.js";
import {MonthlyCalendar} from "./monthly-calendar.js";

function YearlyCalendar(inputDateObj) {
    const currentLocale = inputDateObj.locale;
    const currentYear = inputDateObj.year;
    
    this.getDom = function() {
        const yearNumberDom = getYearNumberDom();
        const monthsDom = getMonthsDom();

        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.div,
                [HTML_PROPERTY.className]: HTML_CLASS.year
            }, [yearNumberDom, monthsDom]
        );
        
        return dom;
    };
    
    function getYearNumberDom() {
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.div,
                [HTML_PROPERTY.className]: HTML_CLASS.yearNumber,
                [HTML_PROPERTY.innerHTML]: currentYear
            }, []
        );
        return dom;
    }
    
    function getMonthsDom() {
        const monthDoms = getMonthDoms();
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.div,
                [HTML_PROPERTY.className]: HTML_CLASS.months
            }, monthDoms
        );
        return dom;
    }
    
    function getMonthDoms() {
        let monthDoms = [];
        for(let i=1; i<=12; i++) {
            const dateObj = {
                locale: currentLocale,
                year: currentYear,
                month: i
            };
            const monthlyCalendar = new MonthlyCalendar(dateObj);
            const dom = monthlyCalendar.getDom();
            monthDoms.push(dom);
        }
        return monthDoms;
    }
}

export {
    YearlyCalendar
};