const TILE = {
  EMPTY: 0,
  FRAME: {
    METAL_BAR: {
      LEFT: 1,
      TOP: 2,
      RIGHT: 3,
      BOTTOM: 4,
    },
    METAL_CORNOR: {
      BL: 5,
      BR: 6,
      TL: 7,
      TR: 8,
    },
    WOOD_BAR: {
      LEFT: 9,
      TOP: 10,
      RIGHT: 11,
      BOTTOM: 12,
    },
    WOOD_CORNOR: {
      BL: 13,
      TR: 14,
      BR: 15,
      TL: 16,
    },
  },
  GROUND: {
    GREEN: {
      GRASS: {
        LEFT: 17,
        MID: 18,
        RIGHT: 19,
      },
      SOIL: {
        LEFT: 20,
        MID: 21,
        RIGHT: 22,
      }
    },
    ORANGE: {
      GRASS: {
        LEFT: 23,
        MID: 24,
        RIGHT: 25,
      },
      SOIL: {
        LEFT: 26,
        MID: 27,
        RIGHT: 28,
      }
    },
    PINK: {
      GRASS: {
        LEFT: 29,
        MID: 30,
        RIGHT: 31,
      },
      SOIL: {
        LEFT: 32,
        MID: 33,
        RIGHT: 34,
      }
    }
  },
  BRICK: {
    WOOD: {
      RECT: {
        LEFT: 35,
        MID: 36,
        RIGHT: 37,
      },
      SQUARE: {
        SMALL: 38,
        BIG: {
          TL: 39,
          TR: 40,
          BL: 41,
          BR: 42,
        }
      }
    },
    METAL: {
      RECT: {
        LEFT: 43,
        MID: 44,
        RIGHT: 45,
      },
      SQUARE: {
        SMALL: 46,
        BIG: {
          TL: 47,
          TR: 48,
          BL: 49,
          BR: 50,
        }
      }
    }
  }
};

export default TILE;