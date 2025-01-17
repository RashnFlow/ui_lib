import styled from "styled-components";

type SelectContainerProps = {
  width: string;
  isShow: boolean;
}
type SuffixProps = {
  isShow: boolean;
}

/* SELECT BASE */
export const SelectContainer = styled.div.attrs({ className: 'wm-select' })<SelectContainerProps>`
  font-family: 'Open Sans';
  font-size: 14px;
  position: relative;
  width: ${({width}) => width || '100%'};
  height: calc(100% - 2px);
  max-width: ${({width}) => width || '100%'};
  border: 1px solid transparent;
  border-color: ${({isShow}) => isShow ? '#66afe9' : 'rgba(83, 92, 105, 0.2)'};
  background: #fff;
  cursor: pointer;
  transition: border .3s ease,background-color .3s ease,color .3s ease,padding .3s ease;
  box-sizing: border-box;

  &:focus, &:hover {
    border-color: #66afe9;
  }
`

export const SelectInner = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  min-height: 38px;
  padding: 5px 32px 5px 8px;
`

export const SelectFilter = styled.input`
  height: auto;
  border: none;
  color: #535c69;
  outline: none;
  flex-grow: 1;
  padding: 0;
  cursor: pointer;

  &.closed::placeholder {
    color: #535c69;
    opacity: 1;
  }

  &::placeholder {
    font-family: 'Open Sans';
    padding: 0 5px;
    font-size: 14px;
    opacity: .5;
  }
`

export const SelectCurrentValue = styled.span`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  color: #535c69;
`

export const SelectErrorMsg = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  color: darkred;
`

export const DropdownMessage = styled.div`
  padding: 8px;
`
/* SELECT BASE */

/* SELECT RIGHT ARROW */
export const SelectSuffix = styled.span<SuffixProps>`
  position: absolute;
  top: 0;
  right: 12px;
  display: inline-flex;
  height: 100%;
  align-items: center;
  transform: ${({isShow}) => isShow ? 'rotate(-180deg)' : 'none'};
  transition: transform 220ms ease;
  z-index: 100;
`

export const Suffix = styled.span`
  border-left: 2px solid #535c69;
  border-top: 2px solid #535c69;
  transform: rotate(-135deg);
  width: 8px;
  height: 8px;
`
/* SELECT RIGHT ARROW */

/* TAGS */
export const SelectTagsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px;
  z-index: 500;
`

export const SelectTag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 2px 8px;
  background: #bcedfc;
  color: #535c69;
  height: 32px;
  cursor: default;
`

export const TagTitle = styled.span`

`

export const TagRemove = styled.span`
  &::before {
    content: '✖';
    font-size: .8rem;
    opacity: .75;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 110ms ease;
  }

  &:hover::before {
    opacity: 1;
  }
`
/* TAGS */
