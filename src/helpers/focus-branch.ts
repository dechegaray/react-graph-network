import { NodeId, isNodeDatum, SelectedLink, SelectedNode } from '../types'

import { findNodeBranchFactory } from './find-node-branch'

interface FocusBranchOptions {
  hoverOpacity?: number
  focusNodeBranchIds?: NodeId[]
  node: SelectedNode
  link: SelectedLink
}

export const focusNodes = (
  ids: NodeId[],
  { node, link, hoverOpacity = 1 }: FocusBranchOptions
) => {
  const branchIds = new Set(ids)

  node.style('opacity', (i) => (branchIds.has(i.id) ? '1' : hoverOpacity))

  link.style('opacity', (i) => {
    const nodeId = isNodeDatum(i.source) ? i.source.id : null
    return nodeId && branchIds.has(nodeId) ? '1' : hoverOpacity
  })
}

export const focusClear = ({ node, link }: FocusBranchOptions) => {
  node.style('opacity', '1')
  link.style('opacity', '1')
}

export const addHoverFocus = (
  findBranch: ReturnType<typeof findNodeBranchFactory>,
  { node, link, hoverOpacity, focusNodeBranchIds }: FocusBranchOptions
) => {
  node
    .on('mouseover', (_, item) => {
      focusNodes(findBranch(item.id), { node, link, hoverOpacity })
    })
    .on('mouseout', () => {
      if (focusNodeBranchIds?.length) {
        return focusNodes(focusNodeBranchIds, { node, link, hoverOpacity })
      }

      focusClear({ node, link })
    })

  return { node, link }
}
