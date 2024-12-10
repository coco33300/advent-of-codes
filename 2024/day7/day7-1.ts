import { getLinesFromFile } from "../../helpers/file.utils";

const calibrations = getLinesFromFile('input.txt');

const recursiveAddOrMultiply = (expected: number, operands: number[]): boolean => {
    const [op1, op2, ...rest] = operands;

    if (op1 > expected) {
        return false;
    }

    const mult = op1 * op2;
    const add = op1 + op2;

    
    if (rest.length === 0) {
        return [mult, add].some(v => v === expected);
    }

    return [
        recursiveAddOrMultiply(expected, [mult].concat(rest)),
        recursiveAddOrMultiply(expected, [add].concat(rest))
    ].some(v => v);
}

let sum = 0;
for (const calibration of calibrations) {
    console.log(calibration)
    const [expected, operandsStr] = calibration.split(':');

    const isValid = recursiveAddOrMultiply(+expected, operandsStr.match(/\d+/g).map(s => +s));
    if (isValid) {
        sum += +expected;
    }
}
console.log(sum)
