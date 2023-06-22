import React from 'react'
import {
  BaseLink,
  BaseNode,
  NetworkGraph,
  NodeComponentProps,
  LinkComponentProps,
  Data,
} from '@dechegaray/react-graph-network'

interface Node extends BaseNode {
  label: string
  special?: boolean
}

type Link = BaseLink<Node>

const data: Data<Node, Link> = {
  nodes: [
    { id: 'node1', label: 'Node 1', special: true },
    { id: 'node2', label: 'Node 2' },
    { id: 'node3', label: 'Node 3' },
    { id: 'node4', label: 'Node 4' },
    { id: 'node5', label: 'Node 5' },
  ],
  links: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node1', target: 'node4' },
    { source: 'node1', target: 'node5' },
  ],
}

const MyLine = (props: LinkComponentProps<Node, Link>) => {
  return <line stroke='blue' {...props} />
}

const MyNode = (props: NodeComponentProps<Node>) => {
  return (
    <g style={{ cursor: 'pointer' }} onClick={() => alert(`${props.node.label} was clicked`)}>
      <circle r={15} fill={props.node?.special ? 'green' : 'blue'} />
      <text x={20} y={5}>
        {props.node.label}
      </text>
    </g>
  )
}

export const MyNetworkGraph = () => {
  return (
    <div style={{ height: 400 }}>
      <NetworkGraph
        enableDrag
        data={data}
        pullIn={false}
        id='network-graph'
        nodeDistance={1000}
        LinkComponent={MyLine}
        NodeComponent={MyNode}
        hoverOpacity={0.1}
      />
    </div>
  )
}
