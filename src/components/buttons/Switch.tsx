import React from 'react';
import styled from 'styled-components';

const CheckBoxWrapper = styled.div`
  position: relative;
`;
type Switch = {
  trackWidth?: string;
  trackHeight?: string;
  thumbActivePosition?: string;
};

const CheckBoxLabel = styled.label<Switch>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.trackWidth};
  height: ${(props) => props.trackHeight};
  border-radius: 15px;
  padding: 3px;
  background: ${(props) => props.theme.main['light-accent']};
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: ${(props) => props.trackHeight};
    height: ${(props) => props.trackHeight};
    background: ${(props) => props.theme.main['dark-accent']};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input<Switch>`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: ${(props) => props.trackWidth};
  height: ${(props) => props.trackHeight};
  &:checked + ${CheckBoxLabel} {
    background: ${(props) => props.theme.main['light-accent']};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: ${(props) => props.trackHeight};
      height: ${(props) => props.trackHeight};
      margin-left: ${(props) => props.thumbActivePosition};
      transition: 0.2s;
    }
  }
`;

function Switch({
  active,
  handleOnChange,
  dimensions: { trackWidth, trackHeight } = {
    trackWidth: '2.625rem',
    trackHeight: '1.625rem',
  },
}: {
  active: boolean;
  dimensions?: Switch;
  handleOnChange: (arg0: boolean) => void;
}) {
  return (
    <CheckBoxWrapper>
      <CheckBox
        id="checkbox"
        type="checkbox"
        thumbActivePosition={`${
          parseFloat(trackWidth?.split(/rem|px|em/)[0] ?? '2.625') -
          parseFloat(trackHeight?.split(/rem|px|em/)[0] ?? '1.125') -
          0.2
        }${trackWidth?.split(/\d+/)[1]}`}
        checked={active}
        onChange={() => handleOnChange(!active)}
      />
      <CheckBoxLabel
        htmlFor="checkbox"
        trackWidth={trackWidth}
        trackHeight={trackHeight}
      />
    </CheckBoxWrapper>
  );
}

export default Switch;
