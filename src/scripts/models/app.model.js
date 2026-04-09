const Color = require('../color');
const ATTRIBUTE_FILL = 'fill';
const CONTRIBUTIONS_ROW = 53;
const CONTRIBUTIONS_COL = 7;

function generateState(resolveColor) {
    return Array.from(Array(CONTRIBUTIONS_ROW))
        .map((_0, i) => ({
            translate: 14 * i,
            rects: Array.from(Array(CONTRIBUTIONS_COL))
                .map((_1, j) => ({
                    dataCol: i,
                    dataRow: j,
                    color: resolveColor(),
                    x: 14 - i,
                    y: 13 * j,
                    height: 10,
                    width: 10,
                })),
        }));
}

function generateRandomState() {
    return generateState(() => Color.random());
}

function setColor(target, resolveColor) {
    const currentColor = new Color(target.getAttribute(ATTRIBUTE_FILL));
    target.setAttribute(ATTRIBUTE_FILL, resolveColor(currentColor));
}

class AppModel {
    constructor(state) {
        this._state = state;
    }

    getContributions() {
        return this._state;
    }

    transformContributions(year) {
        const contributions = [];

        const date = new Date(`${year}.01.01`);
        date.setDate(1 - date.getDay());
        const day = date.getDate();

        for (let i = 0; i < CONTRIBUTIONS_ROW; i += 1) {
            for (let j = 0; j < CONTRIBUTIONS_COL; j += 1) {
                const color = Color.getIndexByColor(this._state[i].rects[j].color);

                if (color) {
                    const rectDate = new Date(date);

                    rectDate.setDate(day + j + i * CONTRIBUTIONS_COL);

                    const d = rectDate.getDate();
                    const m = 1 + rectDate.getMonth();

                    contributions.push(`${d}/${m}/${year}/${color}`);
                }
            }
        }

        return contributions;
    }

    resetContributions() {
        this._state = AppModel.emptyState;
    }

    setRandomContributions() {
        this._state = generateRandomState();
    }

    increaseContributions(target) {
        setColor(target, (color) => color.next());
        this.updateState(target);
    }

    decreaseContributions(target) {
        setColor(target, (color) => color.prev());
        this.updateState(target);
    }

    updateState(target) {
        this._state[target.getAttribute('data-col')]
            .rects[target.getAttribute('data-row')]
            .color = target.getAttribute(ATTRIBUTE_FILL);
    }
}

AppModel.emptyState = generateState(() => Color.default);
AppModel.randomState = generateRandomState();

module.exports = AppModel;
