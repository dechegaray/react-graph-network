import { drag } from 'd3-drag'
import { SimulationNodeDatum } from 'd3-force'

import { BaseNode, SelectedNode, Simulation } from '../types'

interface DragEvent extends BaseNode {
  active: boolean
  subject: SimulationNodeDatum
}

export const addDrag = (node: SelectedNode<Element>, simulation: Simulation, enableDrag: boolean, pullIn: boolean) => {
  if (enableDrag) {
    node.call(
      drag()
        .subject((event: DragEvent) => simulation.find(event.x, event.y))
        .on('start', (event: DragEvent) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          event.subject.fx = event.subject.x
          event.subject.fy = event.subject.y
        })
        .on('drag', (event: DragEvent) => {
          event.subject.fx = event.x
          event.subject.fy = event.y
        })
        .on('end', (event: DragEvent) => {
          if (pullIn) {
            if (!event.active) simulation.alphaTarget(0)
            event.subject.fx = null
            event.subject.fy = null
          }
        }),
    )
  } else {
    node.call(
      drag()
        .subject((_, event: DragEvent) => simulation.find(event.x, event.y))
        .on('start', null)
        .on('drag', null)
        .on('end', null),
    )
  }

  return node
}
