import { getLinesFromFile } from "../../helpers/file.utils";

const lines = getLinesFromFile('input.txt').join();

// const regex = RegExp(/mul\((?:\d+),(?:\d+)\)/m);
const regex = RegExp(/mul\(\d+,\d+\)/gm);

const muls =  lines.match(regex)
const operands = muls.map(s => s.match(/\d+/g))
const multipy = operands.map(([o1, o2]) => +o1 * +o2)
const sum = multipy.reduce((sum, o) => sum + o);

console.log(operands, multipy, sum)