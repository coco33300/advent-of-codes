import { getLinesFromFile } from "../../helpers/file.utils";

const diskMap = getLinesFromFile('input.txt')[0];

const unzippedFileBlockList: (number|string)[] = [];
let empty = false;
let index = 0;
for (const digit of diskMap) {
    if (empty) {
        unzippedFileBlockList.push(...new Array(+digit).fill('.'));
    } else {
        unzippedFileBlockList.push(...new Array(+digit).fill(index));
        index++
    }
    empty = !empty
}

const trimEnd = () => {
    while(unzippedFileBlockList[unzippedFileBlockList.length - 1] === '.') {
        unzippedFileBlockList.pop();
    }
}

while (unzippedFileBlockList.some(e => e === '.')) {
    const elementIndex = unzippedFileBlockList.findLastIndex(e => e !== '.');
    const e = unzippedFileBlockList.splice(elementIndex, 1)
    unzippedFileBlockList.splice(unzippedFileBlockList.indexOf('.'), 1, e[0]);
    trimEnd();
}

const checkSum = unzippedFileBlockList.filter(c => typeof c === 'number').reduce((acc, digit, index) => acc + (digit * index), 0);
console.log(checkSum)
