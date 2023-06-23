import { findNodeBranchFactory } from '../find-node-branch'

interface NetworkGraphLink<D = number | string> {
  source: D
  target: D
}

describe('find-branch.ts', () => {
  const data: NetworkGraphLink<{ id: number }>[] = [
    {
      source: {
        id: 0,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 1,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 2,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 3,
      },
      target: {
        id: 2,
      },
    },
    {
      source: {
        id: 4,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 5,
      },
      target: {
        id: 4,
      },
    },
    {
      source: {
        id: 6,
      },
      target: {
        id: 5,
      },
    },
    {
      source: {
        id: 7,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 8,
      },
      target: {
        id: 7,
      },
    },
    {
      source: {
        id: 9,
      },
      target: {
        id: 8,
      },
    },
    {
      source: {
        id: 10,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 11,
      },
      target: {
        id: 10,
      },
    },
    {
      source: {
        id: 12,
      },
      target: {
        id: 11,
      },
    },
    {
      source: {
        id: 13,
      },
      target: {
        id: 11,
      },
    },
    {
      source: {
        id: 14,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 15,
      },
      target: {
        id: 14,
      },
    },
    {
      source: {
        id: 16,
      },
      target: {
        id: 15,
      },
    },
    {
      source: {
        id: 17,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 18,
      },
      target: {
        id: 17,
      },
    },
    {
      source: {
        id: 19,
      },
      target: {
        id: 18,
      },
    },
    {
      source: {
        id: 20,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 21,
      },
      target: {
        id: 20,
      },
    },
    {
      source: {
        id: 22,
      },
      target: {
        id: 21,
      },
    },
    {
      source: {
        id: 23,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 24,
      },
      target: {
        id: 23,
      },
    },
    {
      source: {
        id: 25,
      },
      target: {
        id: 24,
      },
    },
    {
      source: {
        id: 26,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 27,
      },
      target: {
        id: 26,
      },
    },
    {
      source: {
        id: 28,
      },
      target: {
        id: 27,
      },
    },
    {
      source: {
        id: 29,
      },
      target: {
        id: 27,
      },
    },
    {
      source: {
        id: 30,
      },
      target: {
        id: 0,
      },
    },
    {
      source: {
        id: 31,
      },
      target: {
        id: 30,
      },
    },
    {
      source: {
        id: 32,
      },
      target: {
        id: 31,
      },
    },
  ]

  const findNodeBranch = findNodeBranchFactory(data)
  it.each([
    [11, [11, 10, 0, 12, 13]],
    [0, [0]],
  ])('should branch of %i to be %o', (target, result) => {
    expect(findNodeBranch(target)).toEqual(result)
  })
})
