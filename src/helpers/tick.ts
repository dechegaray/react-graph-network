import { isNodeDatum, SelectedNode, SelectedLink } from '../types'

export const tick = (node: SelectedNode, link: SelectedLink) => {
  link.attr('x1', function (d) {
    return isNodeDatum(d.source) ? d.source.x : undefined
  })

  link.attr('y1', function (d) {
    return isNodeDatum(d.source) ? d.source.y : undefined
  })

  link.attr('x2', function (d) {
    return isNodeDatum(d.target) ? d.target.x : undefined
  })

  link.attr('y2', function (d) {
    return isNodeDatum(d.target) ? d.target.y : undefined
  })

  node.style('transform', function (d) {
    const x = d.x.toString()
    const y = d.y.toString()
    return 'translate('.concat(x, 'px, ').concat(y, 'px)')
  })
}
