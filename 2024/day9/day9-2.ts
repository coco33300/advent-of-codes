import { getLinesFromFile } from "../../helpers/file.utils";

const diskMap = getLinesFromFile('input.txt')[0];

const unzippedFileBlockList = [];
let empty = false;
let index = 0;
for (const digit of diskMap) {
    
    unzippedFileBlockList.push({
        size: +digit,
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

const visualize = () => {
    const plop = unzippedFileBlockList.flatMap(e => new Array(e.size).fill('' + (e.value ?? '.')));
    console.log(plop.reduce((acc, digit, index) => acc + digit, '')) 
}

// while (unzippedFileBlockList.some(e => !e.checked)) {
//     console.log(unzippedFileBlockList);

//     const closestUncheckedIndex = unzippedFileBlockList.findIndex(({checked}) => checked === false);
//     const closestChunk = unzippedFileBlockList[closestUncheckedIndex];

//     if (closestChunk.value !== null) {
//         closestChunk.checked = true
//         continue;
//     }

// //    Try to fill this gap
//     let filler = null;

//     do {
//         const prospectIndex = unzippedFileBlockList.findLastIndex(({checked, value}) => !checked && value !== null);
//         console.log('? ', prospectIndex)
//         const element = unzippedFileBlockList[prospectIndex];

//         if (element?.size > closestChunk.size) {
//             element.checked = true;
//         } else {
//             filler = element;
//             unzippedFileBlockList.splice(prospectIndex, 1);
//             trimEnd();
//         }
//     } while (filler === null && unzippedFileBlockList.some(e => !e.checked && e.value !== null));

//     if (filler) {
//         const leftoverSize = closestChunk.size - filler.size;
//         const toInsertWithSplice = [filler];
//         filler.checked = true;
//         if (leftoverSize > 0) {
//             toInsertWithSplice.push({size: leftoverSize, value: null, checked: false});
//         } 
//         unzippedFileBlockList.splice(closestUncheckedIndex, 1, ...toInsertWithSplice);
//         trimEnd();
//     } else {
//         closestChunk.checked = true;
//     }
// }

while (unzippedFileBlockList.some(({checked, value}) => value && !checked)) {
    // visualize()

    // Take last element
    const lastUncheckedFile = unzippedFileBlockList.findLast(({checked, value}) => !checked && value);

    // console.log({lastUncheckedFile, index:unzippedFileBlockList.indexOf(lastUncheckedFile) })

    // Find space to fit it
    const availableSpace = unzippedFileBlockList.find(({value, size}) => value === null && size >= lastUncheckedFile.size);
    
    if (availableSpace) {
        const uncheckedFileIndex = unzippedFileBlockList.indexOf(lastUncheckedFile);
        const spaceIndex = unzippedFileBlockList.indexOf(availableSpace);
        // console.log ({uncheckedFileIndex, spaceIndex})

        if (uncheckedFileIndex > spaceIndex) {
            const leftoverSize = availableSpace.size - lastUncheckedFile.size;
            const toInsertWithSplice = [lastUncheckedFile];
            if (leftoverSize > 0) {
                toInsertWithSplice.push({size: leftoverSize, value: null, checked: false});
            } 
    
    
            unzippedFileBlockList.splice(spaceIndex, 1, ...toInsertWithSplice);
            unzippedFileBlockList.splice(uncheckedFileIndex + toInsertWithSplice.length - 1, 1, {size: lastUncheckedFile.size, value: null, checked: false});
        }
    }

    lastUncheckedFile.checked = true;
}

const flattened = unzippedFileBlockList.flatMap(e => new Array(e.size).fill(e.value || 0));
// visualize()

const checkSum = flattened.reduce((acc, digit, index) => acc + (digit * index), 0);
console.log(checkSum)
