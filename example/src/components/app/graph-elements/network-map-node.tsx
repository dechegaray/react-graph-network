import React from 'react'

export const NetworkGraphNode = (props: any) => {
  return (
    <g
      style={{
        cursor: 'pointer',
      }}
      onClick={() => alert(`${props.node.label} was clicked`)}
    >
      <circle r={15} fill={props.node?.active ? 'green' : 'blue'} />
      <text x={20} y={5}>
        {props.node.label}
      </text>
    </g>
  )
}
