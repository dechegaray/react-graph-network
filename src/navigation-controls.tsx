import React from 'react'

import { ZoomState } from './zoom'

interface NavigationControlsProps {
  zoom: ZoomState
}

export const NavigationControls = ({ zoom }: NavigationControlsProps) => {
  const zoomInHandler = () => {
    zoom.scale({ scaleX: 1.25, scaleY: 1.25 })
  }

  const zoomOutHandler = () => {
    zoom.scale({ scaleX: 0.75, scaleY: 0.75 })
  }

  return (
    <div className='navigation-controls'>
      <button
        type='button'
        title='Zoom In'
        aria-label='zoom-in'
        className='btn btn-zoom'
        onClick={zoomInHandler}
      >
        +
      </button>
      <button
        type='button'
        title='Zoom Out'
        aria-label='zoom-out'
        className='btn btn-zoom btn-bottom'
        onClick={zoomOutHandler}
      >
        -
      </button>
    </div>
  )
}
