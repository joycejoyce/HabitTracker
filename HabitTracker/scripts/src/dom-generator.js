import {HTML_PROPERTY} from "./html-properties.js";

function DomGenerator() {}

DomGenerator.generateDOMWithChildren = function(domProperties, children) {
    let dom = document.createElement(domProperties[HTML_PROPERTY.tagName]);
    
    let keys = Object.keys(domProperties);
    keys.filter(item => item != HTML_PROPERTY.tagName)
        .forEach(item => dom[item] = domProperties[item]);
    
    children.forEach(child => dom.appendChild(child));
    
    return dom;
};

DomGenerator.appendChildren = function(dom, children, domProperties) {
    let keys = Object.keys(domProperties);
    keys.filter(item => item != HTML_PROPERTY.tagName)
        .forEach(item => dom[item] = domProperties[item]);
    
    children.forEach(child => dom.appendChild(child));
}

DomGenerator.getFlattenAry = function(twoDAry) {
    const ary = twoDAry.reduce((result, item) => {
        result.push(item);
        result = result.flat();
        return result;
    }, []);

    return ary;
}

DomGenerator.generateTextDoms = function(num, text) {
    let doms = [];
    for(let i=0; i<num; i++) {
        const dom = document.createTextNode(text);
        doms.push(dom);
    }
    
    return doms;
};

DomGenerator.replaceHTMLProperty = function(srcDom, replaceObj) {    
    let prefix = "";
    switch(replaceObj.targetType) {
        case HTML_PROPERTY.className:
            prefix = ".";
            break;
        default:
            throw `Unexpected replace-by [${propertyObj.by}]`;
            break;
    }
    const findStr = prefix + replaceObj.targetName;
    
    const value = $(srcDom).find(findStr).prop(replaceObj.property);
    
    $(document).find(findStr).prop(replaceObj.property, value);
}

const REPLACE_OBJ = {
    targetType: "targetType", //className
    targetName: "targetName", //month-name
    property: "property" //innerHTML
};

export {
    DomGenerator,
    REPLACE_OBJ
};