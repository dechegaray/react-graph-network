import React, { useCallback, useEffect, useState } from 'react'

import { Graph } from './graph'
import { Zoom, ZoomChildrenProps } from './zoom'
import { BaseNode, BaseLink, NetworkGraphProps } from './types'

type GraphWithZoomProps<
  Node extends BaseNode = BaseNode,
  Link extends BaseLink<Node> = BaseLink<Node>,
> = NetworkGraphProps<Node, Link> &
  ZoomChildrenProps & {
    centerOnNodeClick?: boolean
  }

const GraphWithZoom = <Node extends BaseNode, Link extends BaseLink<Node>>({
  zoom,
  width,
  height,
  DetailsComponent,
  centerOnNodeClick = false,
  ...props
}: GraphWithZoomProps<Node, Link>) => {
  const [transition, setTransition] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Node>()

  const firstNodeId = props.data?.nodes?.[0]?.id

  const centerCanvasToNode = useCallback((node: Node) => {
    const scale = zoom.transformMatrix.scaleX

    zoom.setTranslate({
      translateX: width / 2 - (node.x || 0) * scale,
      translateY: height / 2 - (node.y || 0) * scale,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTransition(!!selectedNode)
  }, [selectedNode])

  useEffect(() => {
    if (selectedNode && centerOnNodeClick) {
      centerCanvasToNode(selectedNode)
    }
  }, [selectedNode, centerCanvasToNode, centerOnNodeClick])

  useEffect(() => {
    if (firstNodeId !== undefined) {
      const node = props.data.nodes[0]
      centerCanvasToNode(node)
    }
    // only run it once as soon as the first node is ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstNodeId])

  return (
    <div
      style={{ width, height }}
      className={transition ? 'transition' : ''}
      onTransitionEnd={() => setTransition(false)}
    >
      <svg id={props.id} width='100%' height='100%'>
        <rect
          rx={14}
          width='100%'
          height='100%'
          fill='#ffffff'
          className='_move'
          onTouchStart={zoom.dragStart}
          onTouchMove={zoom.dragMove}
          onTouchEnd={zoom.dragEnd}
          onMouseDown={zoom.dragStart}
          onMouseMove={zoom.dragMove}
          onMouseUp={zoom.dragEnd}
          onMouseLeave={() => {
            if (zoom.isDragging) zoom.dragEnd()
          }}
        />
        <g className='_graphZoom' transform={zoom.toString()}>
          <Graph<Node, Link>
            {...props}
            focusNodeBranch={selectedNode?.id}
            selectNode={(node: Node) => {
              setSelectedNode(node)
            }}
          />
        </g>
      </svg>

      {selectedNode && DetailsComponent && (
        <DetailsComponent
          node={selectedNode}
          unselectNode={() => {
            setSelectedNode(undefined)
          }}
        />
      )}
    </div>
  )
}

export const NetworkGraph = <Node extends BaseNode = BaseNode, Link extends BaseLink<Node> = BaseLink<Node>>(
  props: NetworkGraphProps<Node, Link>,
) => {
  return (
    <Zoom className='network-graph' data-testid='network-graph'>
      {({ zoom, height, width }) => {
        return <GraphWithZoom<Node, Link> {...props} zoom={zoom} width={width} height={height} />
      }}
    </Zoom>
  )
}
