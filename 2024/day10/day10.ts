import { getLinesFromFile } from "../../helpers/file.utils";
import { charToInline, Coordinates, getNextPosition } from "../../helpers/inline-map.utils";

const lines = getLinesFromFile('input.txt');

const map = charToInline(lines);

const trailStarts: Coordinates[] = [];
map.map.forEach((e, i) => {
    if (e === '0') {
        trailStarts.push(map.mapIndexToCoordinates(i));
    }
});

console.log('trailheads numbers: ', trailStarts.length)

// à refacto en larger search first ?

const travel = (currentHeight: number, position: Coordinates) => {
    const localHeight = map.itemAt(position);
    
    if (!localHeight) {
        return [];
    }

    if (+localHeight !== currentHeight) {
        return [];
    }

    if (currentHeight === 9) {
        return map.coordinatesToMapIndex(position);
    }

    return [
        getNextPosition(position, 'up'),
        getNextPosition(position, 'right'),
        getNextPosition(position, 'down'),
        getNextPosition(position, 'left'),
    ].filter(p => +map.itemAt(p) === currentHeight + 1)
     .map<number>(p => travel(currentHeight + 1, p))
     .flat()
}

console.log(trailStarts.map((position) =>  new Set(travel(0, position)).size).reduce((acc, n) => n + acc));


const travel2 = (currentHeight: number, position: Coordinates) => {
    const localHeight = map.itemAt(position);
    if (!localHeight) {
        return 0;
    }

    if (+localHeight !== currentHeight) {
        return 0;
    }

    if (currentHeight === 9) {
        return 1;
    }

    return [
        travel2(currentHeight + 1, getNextPosition(position, 'up')),
        travel2(currentHeight + 1, getNextPosition(position, 'down')),
        travel2(currentHeight + 1, getNextPosition(position, 'left')),
        travel2(currentHeight + 1, getNextPosition(position, 'right')),
    ].reduce((acc, next) => acc + next);
}

console.log(trailStarts.map((position) =>  travel2(0, position)).reduce((acc, n) => n + acc));