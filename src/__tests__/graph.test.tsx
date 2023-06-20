import React from 'react'
import { render, screen } from '@testing-library/react'
import { Graph } from '../graph'

// Mocked components
const MockNodeComponent = () => <div>Node Component</div>
const MockLinkComponent = () => <div>Link Component</div>

describe('Graph', () => {
  const data = {
    nodes: [{ id: 'node1' }, { id: 'node2' }],
    links: [{ source: 'node1', target: 'node2' }],
  }

  it('should render Graph component with default components', () => {
    render(
      <svg id='GraphTree_container' data-testid='test-svg'>
        <Graph focusNodeBranch='test' data={data} />
      </svg>,
    )

    const defaultNodes = screen.getByTestId('test-svg').querySelectorAll('._graphNode')
    const defaultLinks = screen.getByTestId('test-svg').querySelectorAll('._graphLine')

    // Assert the presence of nodes and links
    defaultNodes.forEach((node) => {
      expect(node).toBeInTheDocument()
    })

    defaultLinks.forEach((link) => {
      expect(link).toBeInTheDocument()
    })
  })

  it('should render Graph component with custom components', () => {
    render(
      <svg id='GraphTree_container' data-testid='test-svg'>
        <Graph focusNodeBranch='test' data={data} NodeComponent={MockNodeComponent} LinkComponent={MockLinkComponent} />
      </svg>,
    )

    const customNodes = screen.getAllByText('Node Component')
    const customLinks = screen.getAllByText('Link Component')

    // Assert the presence of custom nodes and links
    customNodes.forEach((node) => {
      expect(node).toBeInTheDocument()
    })

    customLinks.forEach((link) => {
      expect(link).toBeInTheDocument()
    })
  })
})
