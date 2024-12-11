export type Coordinates = [number, number];

export class Map {
    constructor(readonly map: string[], readonly width, readonly height){}

    isInBounds = ([x, y]) => y > -1 && y < this.height && x > -1 && x < this.width;
    coordinatesToMapIndex = ([x, y]: Coordinates) => y * this.height + x;
    mapIndexToCoordinates = (index): Coordinates => [
        index % this.width,
        Math.floor(index / this.width)
    ];
    itemAt = (position: Coordinates) => this.isInBounds(position)
        ? this.map[this.coordinatesToMapIndex(position)]
        : null;
}

export const charToInline = (source: string[]) => {
    const map: string[] = [];
    for (let i=0; i < source.length; i++) {
        const line = source[i]
        for(let j = 0; j < line.length; j++) {
            map.push(line.charAt(j))
        }
    }
    return new Map(map, source[0].length, source.length);
}

export const directions = ['up', 'right', 'down', 'left'] as const;
export type Direction = typeof directions[number];
export function vectorFromDirection(direction: typeof directions[number]): [number, number] {
    switch (direction) {
        case "up": return [ 0, -1];
        case "right": return [1, 0]
        case "down": return [ 0, 1]
        case "left": return [-1, 0]
    }
}

export const getNextPosition = ([x, y]: Coordinates, direction: Direction): Coordinates => {
    const [xBis, yBis] = vectorFromDirection(direction)
    return [x + xBis, y + yBis];
}
