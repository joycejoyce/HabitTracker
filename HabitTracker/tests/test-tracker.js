import {loadHTML} from "./common-func-for-tests.js";
import {MonthlyCalendar} from "../scripts/src/calendars/monthly-calendar.js";
import {Tracker} from "../scripts/src/tracker.js";

const expect = require("chai").expect;

beforeEach(loadHTML);

describe(`new Tracker()`, function() {
    it(`return a Tracker`, function() {
        const tracker = new Tracker();
        expect(tracker instanceof Tracker).to.be.true;
    })
})

describe(`mark()`, function() {
    
})