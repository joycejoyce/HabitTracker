import {DomGenerator} from "../dom-generator.js";
import {HTML_CLASS, HTML_PROPERTY, HTML_TAG_NAME} from "../html-properties.js";

function MonthlyCalendar(inputDateObj) {    
    this.getDom = function() {
        const daysOfWeekDom = getDaysOfWeekDom();
        const weekDoms = getWeekDoms();
    };
    
    function getWeekDoms() {
        
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
            const dom = document.createElement(HTML_TAG_NAME.td);
            dom.innerHTML = day;
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
        const locale = inputDateObj.locale;
        let daysOfWeek = fromSundayToSaturday.reduce((ary, date) => {
            const dateObj = new Date(date);
            const day = dateObj.toLocaleDateString(locale, options);
            ary.push(day);
            return ary;
        }, []);
        
        return daysOfWeek;
    }
}

export {
    MonthlyCalendar
};