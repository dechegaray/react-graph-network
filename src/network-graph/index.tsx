import { Zoom } from './zoom'
import { GraphWithZoom } from './graph-with-zoom'
import { BaseNode, BaseLink, NetworkGraphProps } from './types'

export const NetworkGraph = <Node extends BaseNode = BaseNode, Link extends BaseLink<Node> = BaseLink<Node>>(
  props: NetworkGraphProps<Node, Link>,
) => {
  return (
    <Zoom
      className='network-graph'
      data-testid='network-graph'
      enableZoomButtons={props?.enableZoomButtons || false}
      enableMouseWheelZoom={props?.enableMouseWheelZoom || false}
    >
      {({ zoom, height, width }) => {
        return <GraphWithZoom<Node, Link> {...props} zoom={zoom} width={width} height={height} />
      }}
    </Zoom>
  )
}
