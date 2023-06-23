import React from 'react'

export const Zoom = ({ children }: any) => {
  const zoom = {
    initialTransformMatrix: {},
    transformMatrix: {},
    isDragging: false,
    scale: jest.fn(),
    setTranslate: jest.fn(),
    onTouchStart: jest.fn(),
    onTouchMove: jest.fn(),
    onTouchEnd: jest.fn(),
    onMouseDown: jest.fn(),
    onMouseMove: jest.fn(),
    onMouseUp: jest.fn(),
  }

  return <div data-testid='zoom'>{children(zoom)}</div>
}
