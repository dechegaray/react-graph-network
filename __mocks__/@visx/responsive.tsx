import React from 'react'

export const ParentSize = ({ children, ...rest }: any) => {
  return <div {...rest}>{children({ width: 500, height: 500 })}</div>
}
