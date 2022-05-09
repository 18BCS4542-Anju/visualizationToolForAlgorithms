import React from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -40px;
  width: 100%;
`;

export function Footer() {
  return (
    <FooterDiv>
      Made with Efforts by&nbsp;
      <a href='https://github.com/akashkumaryadav/visualizationToolForAlgorithms.git'>
        akashkumaryadav,jayes mantri, anju, ritik kumar
      </a>
    </FooterDiv>
  );
}
