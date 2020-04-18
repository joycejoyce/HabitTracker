import {HTML_PROPERTY, HTML_TAG_NAME, HTML_CLASS} from "./html-properties.js";
import {DomGenerator} from "./dom-generator.js";

function Marker(markDom) {
    this.markAndUnmark = function() {
        if(isMarked()) {
            unmark();
        }
        else {
            mark();
        }
    };
    
    function isMarked() {
        return $(markDom).find("."+HTML_CLASS.crossSign).length > 0;
    }
    
    function mark() {
        const crossSignDom = getCrossSignDom();
        $(markDom).append(crossSignDom);
    }
    
    function getCrossSignDom() {
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.img,
                [HTML_PROPERTY.className]: HTML_CLASS.crossSign,
                [HTML_PROPERTY.src]: "../../images/cross-sign.svg"
            }, []
        );
        console.log("(cross sign)dom = " + dom.outerHTML);
        return dom;
    }
    
}

export {
    Marker
};