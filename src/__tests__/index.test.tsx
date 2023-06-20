import React from 'react'
import { render, screen } from '@testing-library/react'

import { NetworkGraph } from '..'

describe('NetworkGraph', () => {
  const mockGraphProps = {
    data: {
      nodes: [
        { id: 'node1', label: 'Node 1' },
        { id: 'node2', label: 'Node 2' },
        { id: 'node3', label: 'Node 3' },
      ],
      links: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
      ],
    },
  }

  it('renders the graph component', () => {
    render(<NetworkGraph {...mockGraphProps} />)
    expect(screen.getByTestId('network-graph')).toBeInTheDocument()
  })
})
