import {HTML_PROPERTY, HTML_TAG_NAME, HTML_CLASS} from "./html-properties.js";
import {DomGenerator} from "./dom-generator.js";

function Marker(markDom) {    
    const CANVAS = {
        dimension: "2d",
        lineWidth: 3,
        strokeStyle: "#99ccff"
    };
    
    this.markAndUnmark = function() {
        if(isMarked()) {
            this.unmark();
        }
        else {
            this.mark();
        }
    };
    
    this.mark = function() {
        console.log("Enter mark()");
        const points = getPoints();
        const canvasDom = getCanvasDom();
        drawCross(points, canvasDom);
    };
    
    this.unmark = function() {
        console.log("Enter unmark()");
    }
    
    function isMarked() {
        const canvasNum = $(markDom).find(HTML_TAG_NAME.canvas).length;
        if(canvasNum == 0) {
            return false;
        }
        
        const canvas = $(markDom).find(HTML_TAG_NAME.canvas).first();
        return canvas.getContext(CANVAS.dimension)
            .getImageData(0, 0, canvas.width, canvas.height).data
            .some(channel => channel !== 0);
    };
    
    function getPoints() {
        const parentSideLength = getMarkDomSideLength();
        const sideLength = getCanvasSideLength(parentSideLength);
        const offset = getOffset(parentSideLength, sideLength);
        const points = getCrossPoints(offset, sideLength);
        return points;
    }
        
    function getMarkDomSideLength() {
        const sideLength = {
            width: $(markDom).width(),
            height: $(markDom).width()
        };
        /*console.log("(mark)sideLength = ");
        console.log(sideLength);*/
        return sideLength;
    }
        
    function getCanvasSideLength(parentSideLength) {
        const PROPORTION = 0.5;
        const length = Math.round(parentSideLength.width * PROPORTION);
        let sideLength = {
            width: length,
            height: length
        };
        /*console.log("(canvas)sideLength = ");
        console.log(sideLength);*/
        return sideLength;
    }
    
    function getOffset(outerSideLength, innerSideLength) {
        const xOffset = getXOffset(outerSideLength, innerSideLength);
        const yOffset = getYOffset();
        const offset = {
            x: xOffset,
            y: yOffset
        };
        /*console.log("offset = ");
        console.log(offset);*/
        return offset;
    }
    
    function getXOffset(outerSideLength, innerSideLength) {
        const offset = (outerSideLength.width - innerSideLength.width) / 2;
        //console.log("(x)offset = " + offset);
        return offset;
    }
    
    function getYOffset() {
        const fontSize = parseFloat($(markDom).find("."+HTML_CLASS.dateNumber).first().css(HTML_PROPERTY.fontSize));
        const times = 1.2;
        const offset = Math.round(fontSize * times);
        //console.log("(y)offset = " + offset);
        return offset;
    }
    
    function getCrossPoints(offset, sideLength) {
        const leftUpperPoint = {
            x: offset.x,
            y: offset.y
        };
        const rightUpperPoint = {
            x: leftUpperPoint.x + sideLength.width,
            y: leftUpperPoint.y
        };
        const rightLowerPoint = {
            x: rightUpperPoint.x,
            y: rightUpperPoint.y + sideLength.height
        };
        const leftLowerPoint = {
            x: leftUpperPoint.x,
            y: rightLowerPoint.y
        };
        const points = {
            leftUpper: leftUpperPoint,
            rightUpper: rightUpperPoint,
            rightLower: rightLowerPoint,
            leftLower: leftLowerPoint
        };
        console.log("points = ");
        console.log(points);
        return points;
    }
    
    function getCanvasDom() {
        const dom = DomGenerator.generateDOMWithChildren(
            {
                [HTML_PROPERTY.tagName]: HTML_TAG_NAME.canvas,
                [HTML_PROPERTY.className]: HTML_CLASS.crossCanvas
            }, []
        );
        $(markDom).append(dom);
        console.log("modified markDom = " + $(markDom).prop(HTML_PROPERTY.outerHTML));
        return $(markDom).find("."+HTML_CLASS.crossCanvas).first();
    }
    
    function drawCross(points, canvasDom) {
        const canvas = $(canvasDom).get(0);
        const ctx = canvas.getContext(CANVAS.dimension);

        drawLine(ctx, points.leftUpper, points.rightLower);
        drawLine(ctx, points.rightUpper, points.leftLower);
    }
    
    function drawLine(ctx, startPoint, endPoint) {
        const startX = startPoint.x;
        const startY = startPoint.y;
        const endX = endPoint.x;
        const endY = endPoint.y;
        const ANIMATION = {
            speed: 0.05,
            interval: 20
        }
        
        let amount = 0;
        const intervalId = setInterval(function() {
            ctx.lineWidth = CANVAS.lineWidth;
            ctx.beginPath();
            ctx.strokeStyle = CANVAS.strokeStyle;
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount);
            ctx.stroke();
            amount += ANIMATION.speed;
            if(amount > 1) {
                clearInterval(intervalId);
            }
        }, ANIMATION.interval);
    }
}

export {
    Marker
};