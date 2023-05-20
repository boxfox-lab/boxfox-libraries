import { colors } from "@boxfox/bds-common";
import styled from "@emotion/styled";
import { CheckIcon } from "@heroicons/react/solid";
import React, { HTMLProps } from "react";

export function Checkbox({
  onChange,
  color,
  ...props
}: Omit<HTMLProps<HTMLInputElement>, "onChange" | "value"> & {
  value?: boolean;
  onChange: (value: boolean) => void;
  color?: string;
}) {
  return (
    <StyledCheckBox active={props.value} color={color}>
      <CheckIcon width={14} height={14} color={colors.white} />
      <input
        {...props}
        hidden
        type="checkbox"
        value={String(props.value)}
        checked={props.value}
        onChange={(e) => onChange?.(e.currentTarget.checked)}
      />
    </StyledCheckBox>
  );
}

const StyledCheckBox = styled.label<{ active?: boolean; color?: string }>`
  display: flex;
  algin-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray[300]};
  border-radius: 4px;
  padding: 4px 4px 1px 4px;
  display: inline-block;
  cursor: pointer;
  background-color: ${(p) =>
    p.active ? p.color ?? colors.indigo[500] : colors.transparent};
`;
