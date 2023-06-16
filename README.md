# network-graph

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/network-graph.svg)](https://www.npmjs.com/package/network-graph) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn install @dechegaray/react-graph-network
```

## Usage

```tsx
import React from 'react'
import { NetworkGraph } from '@dechegaray/react-graph-network'

const viewportHeight = 300
const exampleData = {
  nodes: [
    { id: 'node1', label: 'Node 1' },
    { id: 'node2', label: 'Node 2' },
    { id: 'node3', label: 'Node 3' },
  ],
  links: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
  ],
}

function App() {
  return (
    <div style={{ height: viewportHeight }}>
      <NetworkGraph id='network-graph' data={exampleData} />
    </div>
  )
}
```

## License

MIT © [](https://github.com/)
