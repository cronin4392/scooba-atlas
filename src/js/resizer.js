const FONTWEIGHTS = [
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900
];

const FONTSTYLES = [
    "normal",
    "italic"
];

function coordinatesFromTouchEvent(event) {
    const touchEvent = event.touches ? event.touches[0] : event;

    return {
        x: touchEvent.pageX,
        y: touchEvent.pageY
    };
}

function getWindowSize() {
    return {
        x: window.innerWidth,
        y: window.innerHeight
    }
}

function mapPercentageToFontSize(percentage) {
    const adjustedPercentage = 1 - percentage;
    const maxFontSize = 2;

    return `${maxFontSize * adjustedPercentage}em`;
}

function mapPercentageToFontWeight(percentage) {
    const length = FONTWEIGHTS.length;
    const index = Math.floor(percentage * length);

    return FONTWEIGHTS[index];
}

function mapNumberToFontStyle(number) {
    const length = FONTSTYLES.length;
    const index = number % length;

    return FONTSTYLES[index];
}

function setFontSize($element, size) {
    $element.style.fontSize = size;
}

function setFontWeight($element, weight) {
    $element.style.fontWeight = weight;
}

function setFontStyle($element, style) {
    $element.style.fontStyle = style;
}

class Resizer {
    constructor({ node }) {
        this.node = node;

        this.mouseMove = this.mouseMove.bind(this);
        this.mouseClick = this.mouseClick.bind(this);

        this.windowSize = getWindowSize();
        this.clickCount = 0;

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        window.addEventListener("mousemove", this.mouseMove);
        window.addEventListener("touchmove", this.mouseMove);
        window.addEventListener("click", this.mouseClick);
    }

    mouseMove(event) {
        const windowSize = this.windowSize;
        const position = coordinatesFromTouchEvent(event);

        const positionXPercentage = ( position.x / windowSize.x );
        const positionYPercentage = ( position.y / windowSize.y );

        const fontWeight = mapPercentageToFontWeight(positionXPercentage);
        const fontSize = mapPercentageToFontSize(positionYPercentage);

        setFontSize(this.node, fontSize);
        setFontWeight(this.node, fontWeight);
    }

    mouseClick(event) {
        this.clickCount++;

        const fontStyle = mapNumberToFontStyle(this.clickCount);

        setFontStyle(this.node, fontStyle);
    }
}

new Resizer({ node: document.querySelector(".letter") });
