//    | is a vertical pipe connecting north and south.
export const pipe = '|' as const;

//    - is a horizontal pipe connecting east and west.
export const dash = '-' as const;

//    L is a 90-degree bend connecting north and east.
export const L = 'L' as const;

//    J is a 90-degree bend connecting north and west.
export const J = 'J' as const;

//    7 is a 90-degree bend connecting south and west.
export const seven = '7' as const;

//    F is a 90-degree bend connecting south and east.
export const F = 'F' as const;

//    . is ground; there is no pipe in this tile.
export const dot = '.' as const;

//    S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
export const S = 'S' as const;

export const symbolsList = [
    pipe,
    dash,
    L,
    J,
    seven,
    F,
    dot,
    S,
]

export type Symbols = typeof symbolsList[number];

export type PipeNode = {
    x: number,
    y: number,
    symbol: Symbols,
    distance: number,
}

