import styled from "styled-components";
import SvgSprite from '../assets/main-ui-control.svg'

export const GreyBorderContainer = styled.div`
  padding-left: 5px;
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  cursor: pointer;
  & * {
    color: #535c69;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
  }
  & > input {
    width: 100%;
    height: 100%;
    line-height: 100%;
    vertical-align: middle;
    border: none;
    background: none;
    outline: none;
    z-index: 1;
  }
  & > p {
    position: absolute;
    & > span {
      color: rgba(255, 255, 255, 0);
    }
  }
`;

export const SvgCalendar = styled.div`
  width: 30px;
  height: 100%;
  background: url(${SvgSprite}) 6px -232px no-repeat;
  opacity: 0.5;
`
