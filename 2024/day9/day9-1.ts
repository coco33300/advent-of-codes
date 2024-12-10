import { getLinesFromFile } from "../../helpers/file.utils";

const diskMap = getLinesFromFile('sample.txt')[0];

const unzippedList = [];
let empty = false;
let index = 0;
for (const digit of diskMap) {
    if (empty) {
        unzippedList.push(...new Array(+digit).fill('.'));
    } else {
        unzippedList.push(...new Array(+digit).fill(''+ index));
        index++
    }
    empty = !empty
}

// console.log(unzippedList.join(''))

let cursorStart = unzippedList.indexOf('.');
let cursorEnd = unzippedList.findLastIndex(c => c!== '.');
do {
    if (unzippedList[cursorEnd] === '.') {
        cursorEnd--
        continue;
    }
    if (unzippedList[cursorStart] !== '.') {
        cursorStart++
        continue;
    }
        // swap
    const tmp = unzippedList.splice(cursorEnd, 1, '.');
    unzippedList.splice(cursorStart, 1, tmp);
    
    // console.log(unzippedList.join(''));
} while (!(/^\d+\.+$/.test(unzippedList.join(''))));

const checkSum = unzippedList.filter(c => c!== '.').reduce((acc, digit, index) => acc + (+digit * index), 0);
console.log(checkSum)
