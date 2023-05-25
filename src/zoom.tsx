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
}

export const Zoom = ({ children, ...rest }: ZoomProps) => {
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
          skewY: 0
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
              <React.Fragment>
                {children({ zoom, height, width })}
                <NavigationControls zoom={zoom} />
              </React.Fragment>
            )}
          </VXZoom>
        )
      }}
    </ParentSize>
  )
}
