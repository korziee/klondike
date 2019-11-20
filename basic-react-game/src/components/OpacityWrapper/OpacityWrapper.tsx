import React, { useMemo } from "react";

export interface IOpacityWrapperProps {
  percentage: number;
}

export const OpacityWrapper: React.FC<IOpacityWrapperProps> = ({
  children,
  percentage
}) => {
  const style = useMemo((): React.CSSProperties => {
    return {
      opacity: percentage,
      transition: "opacity .3s ease-in"
    };
  }, [percentage]);
  return <div style={style}>{children}</div>;
};
