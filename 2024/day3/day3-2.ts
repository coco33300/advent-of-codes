import { getLinesFromFile } from "../../helpers/file.utils";

const lines = getLinesFromFile('input.txt').join();

// const regex = RegExp(/mul\((?:\d+),(?:\d+)\)/m);
// const regex = RegExp(/mul\(\d+,\d+\)/gm);

// only muls after do works
// const dos = /do\(\)/gm
// const donts = /don\'t\(\)/gm;

const regex = RegExp(/(mul\(\d+,\d+\))|(do\(\))|(don\'t\(\))/gm);

const matches = lines.match(regex) || [];

let take = true;
const muls = []
// console.log(matches)
for (const match of matches) {

    if (match.startsWith ('do(')) {
        take = true;
        continue;
    }
    if (match.startsWith ('don')) {
        take = false;
        continue;
    }
    if (take) {
        muls.push(match)
    }
}


const operands = muls.map(s => s.match(/\d+/g))
const multipy = operands.map(([o1, o2]) => +o1 * +o2)
const sum = multipy.reduce((sum, o) => sum + o);

console.log(sum)