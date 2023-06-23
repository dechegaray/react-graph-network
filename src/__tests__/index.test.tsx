import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import {
  NetworkGraph,
  BaseLink,
  BaseNode,
  Data,
  NodeComponentProps,
  LinkComponentProps,
  DetailsComponentProps,
} from '..'

interface Node extends BaseNode {
  label: string
  special?: boolean
}

type Link = BaseLink<Node>

describe('NetworkGraph', () => {
  const handleNodeClick = jest.fn()

  const mockedData: Data<Node, Link> = {
    nodes: [
      { id: 'node1', label: 'Node 1' },
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

  const CustomLinkComponent = (props: LinkComponentProps<Node, Link>) => {
    return <line data-testid='custom-link' stroke='blue' {...props} />
  }

  const CustomNodeComponent = (props: NodeComponentProps<Node>) => {
    return (
      <g data-testid='custom-node' onClick={handleNodeClick}>
        <circle r={15} fill={'green'} />
        <text data-testid='custom-node-text' x={20} y={5}>
          {props.node.label}
        </text>
      </g>
    )
  }

  it('the graph renders with the right number of nodes and links', () => {
    render(
      <div style={{ height: 300 }}>
        <NetworkGraph data={mockedData} id='network-graph' />
      </div>,
    )
    expect(screen.getByTestId('network-graph')).toBeInTheDocument()
    expect(screen.getAllByTestId('node')).toHaveLength(5)
    expect(screen.getAllByTestId('link')).toHaveLength(4)
  })

  it('the graph renders the default node and default link', () => {
    render(
      <div style={{ height: 300 }}>
        <NetworkGraph data={mockedData} id='network-graph' />
      </div>,
    )
    expect(screen.getByTestId('network-graph')).toBeInTheDocument()
    expect(screen.getAllByTestId('node').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('link').length).toBeGreaterThan(0)
  })

  it('the graph renders custom nodes and links', () => {
    render(
      <div style={{ height: 300 }}>
        <NetworkGraph
          data={mockedData}
          id='network-graph'
          NodeComponent={CustomNodeComponent}
          LinkComponent={CustomLinkComponent}
        />
      </div>,
    )
    expect(screen.getByTestId('network-graph')).toBeInTheDocument()

    // no default nodes and links were rendered
    expect(screen.queryByTestId('node')).not.toBeInTheDocument()
    expect(screen.queryByTestId('link')).not.toBeInTheDocument()

    const customNodes = screen.getAllByTestId('custom-node')
    const customLinks = screen.getAllByTestId('custom-link')

    // custom nodes and links were rendered
    expect(customNodes.length).toBeGreaterThan(0)
    expect(customLinks.length).toBeGreaterThan(0)

    const firstNode = screen.getAllByTestId('custom-node')[0]

    // custom nodes renders a label
    expect(firstNode).toHaveTextContent('Node 1')

    // when a node is clicked, the click handler was triggered
    fireEvent.click(firstNode)
    expect(handleNodeClick).toHaveBeenCalled()
  })

  it('renders a detail component when clicking over a node', () => {
    const CustomNodeComponent = (props: NodeComponentProps<Node>) => {
      return (
        <g data-testid='custom-node' onClick={props.selectNode}>
          <circle r={15} fill={'green'} />
          <text
            data-testid='custom-node-text'
            style={{
              color: props.isActive ? 'red' : 'green',
            }}
            x={20}
            y={5}
            onClick={props.onClick}
          >
            {props.node.label}
          </text>
        </g>
      )
    }

    const ObjectDetails = ({ node, unselectNode }: DetailsComponentProps<Node>) => {
      return (
        <div role='dialog'>
          <h6>{`Details of "${node.label}"`}</h6>
          <button
            title='Close panel'
            data-testid='close-btn'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              unselectNode()
            }}
          />
        </div>
      )
    }

    render(
      <div style={{ height: 300 }}>
        <NetworkGraph
          data={mockedData}
          id='network-graph'
          NodeComponent={CustomNodeComponent}
          LinkComponent={CustomLinkComponent}
          DetailsComponent={ObjectDetails}
        />
      </div>,
    )

    const node1Label = 'Node 1'

    // active state is disabled until node was clicked
    expect(screen.getByText(node1Label)).toHaveStyle('color: green')

    // verify that details component was rendered with right data
    fireEvent.click(screen.getByText(node1Label))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveTextContent(`Details of "${node1Label}"`)

    // node active state is enabled
    expect(screen.getByText(node1Label)).toHaveStyle('color: red')

    // close details component by triggering |unselectNode|
    fireEvent.click(screen.getByTitle('Close panel'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
