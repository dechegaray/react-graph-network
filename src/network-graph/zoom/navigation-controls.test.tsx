import { createRef } from "react";
import { render, fireEvent } from "@testing-library/react";

import type { ZoomState } from ".";
import { NavigationControls } from "./navigation-controls";

interface TransformMatrix {
  scaleX: number;
  scaleY: number;
  translateX: number;
  translateY: number;
  skewX: number;
  skewY: number;
}

const zoom = {
  scale: jest.fn(),
  center: jest.fn(),
  clear: jest.fn(),
  translate: jest.fn(),
  translateTo: jest.fn(),
  setTranslate: jest.fn(),
  setTransformMatrix: jest.fn(),
  reset: jest.fn(),
  handleWheel: jest.fn(),
  handlePinch: jest.fn(),
  dragStart: jest.fn(),
  dragEnd: jest.fn(),
  dragMove: jest.fn(),
  invert: jest.fn(),
  toStringInvert: jest.fn(),
  applyToPoint: jest.fn(),
  applyInverseToPoint: jest.fn(),
  containerRef: createRef<Element>(),
};

const transformMatrix: TransformMatrix = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0,
};

const zoomState: ZoomState = {
  initialTransformMatrix: transformMatrix,
  transformMatrix: transformMatrix,
  isDragging: false,
  ...zoom,
};

describe("NavigationControls", () => {
  it("should increase |scaleX| and |scaleY| values when zoom in button is clicked", () => {
    const { getByLabelText } = render(<NavigationControls zoom={zoomState} />);

    const zoomInButton = getByLabelText("zoom-in");
    fireEvent.click(zoomInButton);

    expect(zoom.scale).toHaveBeenCalledWith({ scaleX: 1.25, scaleY: 1.25 });
  });

  it("should decrease |scaleX| and |scaleY| values when zoom in button is clicked", () => {
    const { getByLabelText } = render(<NavigationControls zoom={zoomState} />);

    const zoomOutButton = getByLabelText("zoom-out");
    fireEvent.click(zoomOutButton);

    expect(zoom.scale).toHaveBeenCalledWith({ scaleX: 0.75, scaleY: 0.75 });
  });
});
