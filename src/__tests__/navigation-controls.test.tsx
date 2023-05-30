import React from 'react'
import { screen, render } from '@testing-library/react'

import { NavigationControls } from '../navigation-controls'
import { ZoomState } from '../zoom'

describe('NavigationControls', () => {
  it('renders', () => {
    render(<NavigationControls zoom={{} as ZoomState} />)

    expect(screen.getByTitle('Zoom In')).toBeInTheDocument()
    expect(screen.getByTitle('Zoom Out')).toBeInTheDocument()
  })
})
