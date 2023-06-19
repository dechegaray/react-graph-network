import { Zoom as VXZoom } from '@visx/zoom'
import { ParentSize } from '@visx/responsive'
import { ProvidedZoom, TransformMatrix } from '@visx/zoom/lib/types'
import React, { ReactElement } from 'react'

import { NavigationControls } from './navigation-controls'

export type ZoomState = ProvidedZoom<Element> & {
  initialTransformMatrix: TransformMatrix
  transformMatrix: TransformMatrix
  isDragging: boolean
}

export interface ZoomChildrenProps {
  zoom: ZoomState
  height: number
  width: number
}

interface ZoomProps {
  children(props: ZoomChildrenProps): ReactElement
  className: string
  enableZoomButtons: boolean
  enableMouseWheelZoom: boolean
}

export const Zoom = ({ children, enableZoomButtons = true, enableMouseWheelZoom = true, ...rest }: ZoomProps) => {
  const handleMouseWheel = (event: React.WheelEvent<HTMLDivElement>, zoom: ZoomState) => {
    if (!enableMouseWheelZoom) return
    if (event.deltaY > 0) {
      zoom.scale({ scaleX: 1.25, scaleY: 1.25 })
    } else {
      zoom.scale({ scaleX: 0.75, scaleY: 0.75 })
    }
  }

  return (
    <ParentSize {...rest}>
      {({ width, height }) => {
        if (!width || !height) return

        const translateX = (width - width * 0.75) / 2 + 20
        const translateY = (height - height * 0.75) / 2

        const initialTransform = {
          scaleX: 0.75,
          scaleY: 0.75,
          translateX,
          translateY,
          skewX: 0,
          skewY: 0,
        }

        return (
          <VXZoom
            width={width}
            height={height}
            scaleXMin={0.5}
            scaleXMax={3}
            scaleYMin={0.5}
            scaleYMax={3}
            initialTransformMatrix={initialTransform}
          >
            {(zoom) => (
              <div onWheel={(event) => handleMouseWheel(event, zoom)}>
                {children({ zoom, height, width })}
                {enableZoomButtons && <NavigationControls zoom={zoom} />}
              </div>
            )}
          </VXZoom>
        )
      }}
    </ParentSize>
  )
}
