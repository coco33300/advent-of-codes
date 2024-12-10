import { getLinesFromFile } from "../../helpers/file.utils";

const calibrations = getLinesFromFile('input.txt');

const add = (a: string, b: string) => (+a) + (+b);
const multiply = (a: string, b: string) => (+a) * (+b);

const recursiveAddMultiplyOrConcat = (expected: number, operands: string[]): boolean => {
    const [op1, op2, ...rest] = operands;

    if (+op1 > expected) {
        return false;
    }

    const mult = multiply(op1, op2);
    const added = add(op1, op2);
    const concat = op1.concat(op2);
    
    if (rest.length === 0) {
        return [mult, added, concat].some(v => +v === expected);
    }

    return [
        recursiveAddMultiplyOrConcat(expected, ['' +mult].concat(rest)),
        recursiveAddMultiplyOrConcat(expected, ['' + added].concat(rest)),
        recursiveAddMultiplyOrConcat(expected, [concat].concat(rest))
    ].some(v => v);
}

let sum = 0;
for (const calibration of calibrations) {
    // console.log(calibration)
    const [expected, operandsStr] = calibration.split(':');

    const isValid = recursiveAddMultiplyOrConcat(+expected, operandsStr.match(/\d+/g));
    if (isValid) {
        sum += +expected;
    }
}
console.log(sum)
