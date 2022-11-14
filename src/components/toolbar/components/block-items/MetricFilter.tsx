import React from "react";
import Badge from "../../../badge";
import { MetricFilterContainer } from "../../styles";
import { IBlockItemMetricFilter, IBlockItemPropsGeneric } from "../../types";


export function MetricFilter({ blockItem, onClick, key }: IBlockItemPropsGeneric<IBlockItemMetricFilter>) {
  return (
    <MetricFilterContainer key={key} title={blockItem.title} onClick={() => onClick(blockItem)} >
      <Badge count={blockItem.value} type={blockItem.params.color} />
      <span>{blockItem.title}</span>
    </MetricFilterContainer>
  )
}
