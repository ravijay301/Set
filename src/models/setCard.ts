export interface SetCardModel {
    color: SetCardColor;
    shape: SetCardShape;
    number: SetCardNumber;
    shading: SetCardShading;
}
export enum SetCardColor {
    PURPLE = 0,
    GREEN = 1,
    RED = 2
}
export enum SetCardShape {
    DIAMOND = 0,
    SQUIGGLE = 1,
    OVAL = 2
}
export enum SetCardNumber {
    ONE = 0,
    TWO = 1,
    THREE = 2
}
export enum SetCardShading {
    SOLID = 0,
    STRIPED = 1,
    OPEN = 2
}