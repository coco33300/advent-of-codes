import { getLinesFromFile } from "../../helpers/file.utils";

const diskMap = getLinesFromFile('input.txt')[0];

const unzippedFileBlockList = [];
let empty = false;
let index = 0;
for (const digit of diskMap) {
    
    unzippedFileBlockList.push({
        size: digit,
        value: empty ? null : index++,
        checked: false
    })
    empty = !empty
}

const trimEnd = () => {
    while(unzippedFileBlockList[unzippedFileBlockList.length - 1].value === null) {
        unzippedFileBlockList.pop();
    }
}


while (unzippedFileBlockList.some(e => !e.checked)) {

    const closestUncheckedIndex = unzippedFileBlockList.findIndex(({checked}) => checked === false);
    const closestChunk = unzippedFileBlockList[closestUncheckedIndex];

    if (closestChunk.value !== null) {
        closestChunk.checked = true
        continue;
    }

    // Try to fill this gap
    let filler = null;

    do {
        const prospectIndex = unzippedFileBlockList.findLastIndex(({checked, value}) => !checked && value !== null);
        const element = unzippedFileBlockList[prospectIndex];

        if (element.size > closestChunk.size) {
            element.checked = true;
        } else {
            filler = element;
            unzippedFileBlockList.splice(prospectIndex, 1);
            trimEnd();
        }
    } while(filler === null && unzippedFileBlockList.some(e => !e.checked && e.value !== null));

    if (filler) {
        
    }
}


// const checkSum = unzippedFileBlockList.filter(c => typeof c === 'number').reduce((acc, digit, index) => acc + (digit * index), 0);
console.log(checkSum)
