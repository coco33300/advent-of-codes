import { exit } from "process";
import { getLinesFromFile } from "../../helpers/file.utils";

class Rock {
    constructor(
        public value: string | null,
        public amount: number = 1,
    ) { }

    blink() {
        if (this.value === null) {
            return;
        }

        if (this.value === '0') {
            this.value = '1';
            return;
        }

        if (this.value.length % 2 === 0) {
            return this.split();
        }

        this.value = '' + ((+this.value) * 2024);
    }

    split() {
        return [
            new Rock('' + (+this.value.slice(0, this.value.length / 2)), this.amount),
            new Rock('' + (+this.value.slice(this.value.length / 2)), this.amount)
        ];
    }
}

const initialRocks = getLinesFromFile('input.txt')[0];
console.log(initialRocks);
// // rules
// If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
// If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
// If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

// const applyRule = (stone: string | string[]) => {
//     if (!Array.isArray(stone)) {
//         if (stone === '0') {
//             return '1'
//         }
//         if (stone.length % 2 === 0) {
//             return [
//                 '' + (+stone.slice(0, stone.length / 2)),
//                 '' + (+stone.slice(stone.length / 2))
//             ];
//         }

//         return '' + ((+stone) * 2024);
//     }

//     return stone.map(applyRule);
// }

let rocks: Rock[] = initialRocks.match(/\d+/g).map(s => new Rock(s));

for (let i = 0; i < 75; i++) {
    const nextRocks: Rock[] = [];

    for (const rock of rocks) {
        const newRocks = rock.blink();

        if (newRocks) {
            newRocks.forEach(newRocky => {
                const match = nextRocks.find(r => r.value === newRocky.value);
                if (match) {
                    match.amount+= newRocky.amount
                } else {
                    nextRocks.push(newRocky)
                }
            })
        } else {
            const matchInNext = nextRocks.find(r => r.value === rock.value);
            if (matchInNext) {
                matchInNext.amount += rock.amount
            } else {
                nextRocks.push(rock)
            }
        }
    }
    if (i === 25) {
        console.log(nextRocks.reduce((a,{amount}) => a + amount, 0) )
    }
    rocks = nextRocks;
}

console.log(rocks.reduce((a,{amount}) => a + amount, 0));

// console.log(graphLen(rocks));

