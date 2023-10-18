# network-graph

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/network-graph.svg)](https://www.npmjs.com/package/network-graph) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install @dechegaray/react-graph-network
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

# Development

For development simply cd into the root folder of this project and run the following:

- `npm install` to install dependencies for your project
- `npm link` to create a symlink to this package

After your changes are completed

- `cd ./examples` to execute the sample project
- `npm install` to install dependencies on the sample project
- `npm link @dechegaray/react-graph-network` to add a reference to the symlink created above and avoiding the need of installing the actual dependency
- `npm run dev` to start your dev server and see your changes live

Add proper unit/component test as needed

## License

MIT © [](https://github.com/)
