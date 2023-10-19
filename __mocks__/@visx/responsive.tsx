// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ParentSize = ({ children, ...rest }: any) => {
  return <div {...rest}>{children({ width: 500, height: 500 })}</div>;
};
