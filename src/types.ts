import type { forceSimulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3-force'
import type { ReactElement } from 'react'
import type { BaseType, Selection } from 'd3-selection'

export type NodeId = string | number

export interface BaseNode extends SimulationNodeDatum {
  id: NodeId
  gForce?: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseLink<NodeDatum extends BaseNode> extends SimulationLinkDatum<NodeDatum> {}

export interface Data<Node extends BaseNode, Link extends BaseLink<Node>> {
  nodes: Node[]
  links: Link[]
}

export interface NodeComponentProps<Node extends BaseNode> {
  node: Node
  isActive: boolean
  selectNode(): void
}

export interface DetailsComponentProps<Node extends BaseNode> {
  node: Node
  unselectNode(): void
}

export interface LinkComponentProps<Node extends BaseNode, Link extends BaseLink<Node>> {
  link: Link
  className: string
}

export interface GraphProps<Node extends BaseNode = BaseNode, Link extends BaseLink<Node> = BaseLink<Node>> {
  data: Data<Node, Link>
  focusNodeBranch: NodeId

  id?: string
  pullIn?: boolean
  enableDrag?: boolean
  nodeDistance?: number
  hoverOpacity?: number
  selectNode?(node: Node): void
  NodeComponent?(props: NodeComponentProps<Node>): ReactElement
  LinkComponent?(props: LinkComponentProps<Node, Link>): ReactElement
  DetailsComponent?(props: DetailsComponentProps<Node>): ReactElement
}

export type NetworkGraphProps<Node extends BaseNode = BaseNode, Link extends BaseLink<Node> = BaseLink<Node>> = Omit<
  GraphProps<Node, Link>,
  'focusNodeBranch' | 'selectNode'
>

export const isNodeDatum = (subject: BaseLink<BaseNode>['source']): subject is BaseNode => {
  return (subject as BaseNode).id !== undefined
}

export type Simulation = ReturnType<typeof forceSimulation>

export type SelectedNode<GElement extends BaseType = BaseType> = Selection<GElement, BaseNode, SVGSVGElement, unknown>

export type SelectedLink<GElement extends BaseType = BaseType> = Selection<
  GElement,
  BaseLink<BaseNode>,
  SVGSVGElement,
  unknown
>
