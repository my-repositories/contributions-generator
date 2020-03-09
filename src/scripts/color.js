const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#96127'];

function getIndexByColor(target) {
    return colors.findIndex((color) => color === target);
}

class Color {
    constructor(color) {
        this.color = color;
    }

    static random() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    next() {
        const index = getIndexByColor(this.color);

        if (index + 1 === colors.length) {
            return colors[colors.length - 1];
        }

        return colors[index + 1];
    }

    prev() {
        const index = getIndexByColor(this.color);

        if (index === 0) {
            return colors[index];
        }

        return colors[index - 1];
    }
}

[Color.default] = colors;

module.exports = Color;