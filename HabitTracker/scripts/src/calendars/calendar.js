import {MonthlyCalendar} from "./monthly-calendar.js";
//import {YearlyCalendar} from "./yearly-calendar.js";

function Calendar() {
    this.getCalendar = function(calendarObj, type) {
        switch(type) {
            case CALENDAR_TYPE.monthly:
                return new MonthlyCalendar(calendarObj);
                break;
            /*case CALENDAR_TYPE.yearly:
                return new YearlyCalendar(calendarObj);
                break;*/
            default:
                throw `Invalid calendar type: [${type}]`;
                break;
        }
    };
}

const CALENDAR_TYPE = {
    monthly: "monthly",
    yearly: "yearly"
};

const LOCALE = {
    english: "en-US",
    french: "fr-FR",
    japanese: "ja-JP",
    chinese: "zh-TW",
    danish: "da-DK",
    german: "de-DE",
    spanish: "es-ES",
    portuguese: "pt-BR",
    italian: "it-IT",
    dutch: "nl-NL",
    korean: "ko-KR",
    swedish: "sv-SE"
};

export {
    Calendar,
    CALENDAR_TYPE,
    LOCALE
};