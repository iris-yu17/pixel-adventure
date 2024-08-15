import ALPHABET from '../types/alphabet';

const textTable: Record<ALPHABET, [number, number]> = {
  [ALPHABET.A]: [0, 0],
  [ALPHABET.B]: [1, 0],
  [ALPHABET.C]: [2, 0],
  [ALPHABET.D]: [3, 0],
  [ALPHABET.E]: [4, 0],
  [ALPHABET.F]: [5, 0],
  [ALPHABET.G]: [6, 0],
  [ALPHABET.H]: [7, 0],
  [ALPHABET.I]: [8, 0],
  [ALPHABET.J]: [9, 0],

  [ALPHABET.K]: [0, 1],
  [ALPHABET.L]: [1, 1],
  [ALPHABET.M]: [2, 1],
  [ALPHABET.N]: [3, 1],
  [ALPHABET.O]: [4, 1],
  [ALPHABET.P]: [5, 1],
  [ALPHABET.Q]: [6, 1],
  [ALPHABET.R]: [7, 1],
  [ALPHABET.S]: [8, 1],
  [ALPHABET.T]: [9, 1],

  [ALPHABET.U]: [0, 2],
  [ALPHABET.V]: [1, 2],
  [ALPHABET.W]: [2, 2],
  [ALPHABET.X]: [3, 2],
  [ALPHABET.Y]: [4, 2],
  [ALPHABET.Z]: [5, 2],
  [ALPHABET.SPACE]: [6, 2]
};

export default textTable;