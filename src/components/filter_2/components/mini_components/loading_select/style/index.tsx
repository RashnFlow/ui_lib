import styled, { keyframes } from "styled-components";

export const LoadingSelectContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: #fff;
  z-index: 10;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const anim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSelectRing = styled.div`
  display: inline-block;
  position: absolute;
  top: 25px;
  left: 45%;
  width: 50px;
  height: 50px;
  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 34px;
    height: 34px;
    margin: 8px;
    border: 4px solid #fff;
    border-radius: 50%;
    animation: ${anim} 0.7s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #dfdfdf transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.225s;
    }
    &:nth-child(2) {
      animation-delay: -0.15s;
    }
    &:nth-child(3) {
      animation-delay: -0.075s;
    }
  }
`;
