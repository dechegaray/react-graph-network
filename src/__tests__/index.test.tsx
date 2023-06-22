import React from 'react'
import { render, screen, prettyDOM, fireEvent } from '@testing-library/react'

import { NetworkGraph, BaseLink, BaseNode, Data, NodeComponentProps, LinkComponentProps } from '..'

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

  it('The graph renders with the right number of nodes and links', () => {
    render(
      <div style={{ height: 300 }}>
        <NetworkGraph data={mockedData} id='network-graph' />
      </div>,
    )
    expect(screen.getByTestId('network-graph')).toBeInTheDocument()
    expect(screen.getAllByTestId('node')).toHaveLength(5)
    expect(screen.getAllByTestId('link')).toHaveLength(4)
  })

  it('The graph renders the default node and default link', () => {
    render(
      <div style={{ height: 300 }}>
        <NetworkGraph data={mockedData} id='network-graph' />
      </div>,
    )
    expect(screen.getByTestId('network-graph')).toBeInTheDocument()
    expect(screen.getAllByTestId('node').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('link').length).toBeGreaterThan(0)
  })

  it('The graph renders custom nodes and links', () => {
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

  // it('when hovering over a node, the opacity of other nodes changes', () => {
  //   render(
  //     <div style={{ height: 300 }}>
  //       <NetworkGraph
  //         data={mockedData}
  //         id='network-graph'
  //         NodeComponent={CustomNodeComponent}
  //         LinkComponent={CustomLinkComponent}
  //         hoverOpacity={0.1}
  //       />
  //     </div>,
  //   )

  //   const text1Node = screen.getByText('Node 1')
  //   const otherNodes = screen.queryAllByTestId('custom-node-text').filter((el) => el !== text1Node)

  //   fireEvent.mouseOver(screen.getAllByTestId('custom-node')[0])
  //   // console.log(screen.getByText('Node 2').parentElement?.style)
  //   expect(screen.getByText('Node 2').parentElement).toHaveStyle('opacity: 0.1')

  //   // await waitFor(() => {
  //   //   otherNodes.forEach((customNode) => {
  //   //     console.log(customNode.parentElement?.style)
  //   //     expect(customNode.parentNode)
  //   //   })
  //   // })

  //   // otherNodes.forEach((customNode) => {
  //   //   console.log(customNode)
  //   //   expect(customNode.parentNode).toHaveStyle('opacity: 0.1')
  //   // })
  //   // expect(screen.getByText('Node 2')).toHaveStyle('opacity: 0.1')
  // })
})
