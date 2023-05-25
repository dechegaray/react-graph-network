import * as React from 'react';

interface Data<Node extends BaseNode, Link extends BaseLink<Node>> {
  nodes: Node[];
  links: Link[];
}
interface Props<
  Node extends BaseNode = BaseNode,
  Link extends BaseLink<Node> = BaseLink<Node>
> {
  data: Data<Node, Link>;
  id?: string;
  pullIn?: boolean;
  enableDrag?: boolean;
  nodeDistance?: number;
  hoverOpacity?: number;
  selectNode?(node: Node): void;
  NodeComponent?(props: NodeComponentProps<Node>): ReactElement;
  LinkComponent?(props: LinkComponentProps<Node, Link>): ReactElement;
  DetailsComponent?(props: DetailsComponentProps<Node>): ReactElement;
}
export declare const NetworkGraph: ({ data, id, pullIn, enableDrag, nodeDistance, hoverOpacity, selectNode, NodeComponent, LinkComponent, DetailsComponent }: Props) => React.JSX.Element;
export {};
