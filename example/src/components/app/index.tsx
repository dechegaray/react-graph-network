import React from 'react'

import { NetworkGraph } from 'network-graph'

import { NetworkMapLine } from './graph-elements/network-map-line'
import { NetworkGraphNode } from './graph-elements/network-map-node'

const data = {
  nodes: [
    { id: 'node1', label: 'Node 1', active: true },
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

const App = () => {
  return (
    <div style={{ height: 400 }}>
      <NetworkGraph
        id='network-graph'
        data={data}
        pullIn={false}
        enableDrag
        LinkComponent={NetworkMapLine}
        NodeComponent={NetworkGraphNode}
        nodeDistance={1000}
      />
    </div>
  )
}

export default App
