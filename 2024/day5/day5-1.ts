import { getLinesFromFile } from "../../helpers/file.utils";

const lines = getLinesFromFile('input.txt').join('\n');
// const lines = getLinesFromFile('input.txt');

// X|Y
// X before Y

const [pagesOrdering, reports] = lines.split('\n\n');

const pagesOrderingPairs = pagesOrdering.split('\n').map(o => o.match(/\d+/g));
// console.log(pagesOrderingPairs)

// const mapAfter = new Map() // not needed ?
const mapBefore = new Map<string, Set<string>>()

pagesOrderingPairs.forEach(([before, after]) => {
    if (mapBefore.has(before)) {
        mapBefore.get(before).add(after);
    } else {
        mapBefore.set(before, new Set([after]))
    }
});
console.log(mapBefore)

// check order of pages of updates lines.

const reportsList = reports.split('\n').map(r => r.match(/\d+/g));
// console.log(reportsList);

const validReports = [];
// reportsList.forEach(r => {
//     const pages = r.match(/\d+/g);

//     console.log(pages);
//     pages.

//     // if ( pages.every((v, i) => pages.slice(i +1).every(op => !mapBefore.get(v)?.has(op) || true))) {
//     //     validReports.push(pages);
//     // }
// })

reportsList.forEach(report => {
    // console.log(report);

    const isValid = report.every((page, index) => {
        if (index === 0) {
            return true;
        }
        const pagesThatMustBeBefore = mapBefore.get(page);
        if (!pagesThatMustBeBefore) {
            return true;
        }
        const slice = report.slice(0, index)
        // console.log({index, page, slice} )

        return !slice.some(previous => pagesThatMustBeBefore.has(previous))
    });
    if (isValid) {
        validReports.push(report);
    }
})

console.log(validReports)
console.log(validReports.reduce((acc, n) => acc + +n[Math.floor(n.length/2)] ,0))

// Sum middle pages of valid updates.