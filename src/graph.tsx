import { forceLink, forceCenter, forceManyBody, forceSimulation } from 'd3-force'
import { select } from 'd3-selection'
import React, { useEffect } from 'react'

import { BaseLink, BaseNode, GraphProps, SelectedNode } from './types'

import { tick } from './helpers/tick'
import { addDrag } from './helpers/add-drag'
import { findNodeBranchFactory } from './helpers/find-node-branch'
import { addHoverFocus, focusClear, focusNodes } from './helpers/focus-branch'

const DefaultNode = () => <circle fill='black' r={10} className='_graphNode' data-testid='node' />
const DefaultLink = () => <line stroke='grey' className='_graphLine' data-testid='link' />

export const Graph = <Node extends BaseNode, Link extends BaseLink<Node>>({
  data,
  pullIn,
  enableDrag,
  focusNodeBranch,
  hoverOpacity = 1,
  nodeDistance = 300,
  id = 'GraphTree_container',
  NodeComponent = DefaultNode,
  LinkComponent = DefaultLink,
  selectNode,
}: GraphProps<Node, Link>) => {
  useEffect(() => {
    if (!data) return
    const svg = select<SVGSVGElement, unknown>(`#${id}`)
    const parentElement = svg.select('* > g').node() as HTMLElement

    const link = svg.selectAll('._graphLine').data(data.links)
    const node = svg.selectAll('._graphNode').data(data.nodes)

    const simulation = forceSimulation<Node>(data.nodes)
      // This force provided links between nodes
      .force(
        'link',
        forceLink<Node, Link>()
          .id((d) => d.id)
          .links(data.links),
      )

      // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force(
        'charge',
        forceManyBody<Node>().strength((node) => node.gForce ?? -nodeDistance),
      )

      // This force attracts nodes to the center of the svg area
      .force('center', forceCenter(parentElement.clientWidth / 2, parentElement.clientHeight / 2))

      // adds styling attributes to the nodes/links and translates their position
      .on('tick', () => tick(node, link))

    const findNodeBranch = findNodeBranchFactory(data.links)

    const focusNodeBranchIds = focusNodeBranch ? findNodeBranch(focusNodeBranch) : []

    if (focusNodeBranchIds.length) {
      focusNodes(focusNodeBranchIds, { node, link, hoverOpacity })
    } else {
      focusClear({ node, link })
    }

    // add interactions
    addHoverFocus(findNodeBranch, {
      node,
      link,
      hoverOpacity,
      focusNodeBranchIds,
    })

    addDrag(node as SelectedNode<Element>, simulation, enableDrag, pullIn)
  }, [id, data, pullIn, enableDrag, hoverOpacity, focusNodeBranch, nodeDistance])

  const isFirstNodeSimulated = data?.nodes?.[0].id === undefined

  if (isFirstNodeSimulated) {
    return null
  }

  return (
    <React.Fragment>
      {data?.links.map((link, i) => (
        <LinkComponent key={`link-${link.index || i}`} link={link} className='_graphLine' />
      ))}
      {data?.nodes.map((node) => (
        <g key={`node-${node.id}`} className='_graphNode'>
          <NodeComponent node={node} isActive={focusNodeBranch === node.id} selectNode={() => selectNode(node)} />
        </g>
      ))}
    </React.Fragment>
  )
}
