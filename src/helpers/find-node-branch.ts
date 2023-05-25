import { BaseLink, BaseNode, NodeId } from '../types'

export const findNodeBranchFactory = <
  Node extends BaseNode,
  Link extends BaseLink<Node>
>(
  links: Link[]
): ((target: NodeId) => NodeId[]) => {
  const relationsSource = new Map<NodeId, Set<NodeId>>()
  const relationsTarget = new Map<NodeId, Set<NodeId>>()

  for (const item of links) {
    const target = item.target as Node
    const source = item.source as Node

    const targetSet = relationsTarget.get(target.id) || new Set<NodeId>()
    const sourcetSet = relationsSource.get(source.id) || new Set<NodeId>()

    targetSet.add(source.id)
    sourcetSet.add(target.id)
    relationsTarget.set(target.id, targetSet)
    relationsSource.set(source.id, sourcetSet)
  }

  const findBranch = (
    source: Map<NodeId, Set<NodeId>>,
    prev: NodeId[],
    target: NodeId
  ) => {
    const items = source.get(target)
    if (!items) return prev

    const itemsArr = Array.from(items)
    prev.push(...items)

    if (itemsArr[0] === 0) {
      return
    }

    itemsArr.forEach((i) => findBranch(source, prev, i))
  }

  return (target: NodeId): NodeId[] => {
    const items: NodeId[] = [target]

    if (target === 0) return items

    findBranch(relationsSource, items, target)
    findBranch(relationsTarget, items, target)

    return items
  }
}
