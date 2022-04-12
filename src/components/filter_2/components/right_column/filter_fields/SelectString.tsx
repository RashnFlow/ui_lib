import React, { useState } from 'react';
import { useCustomContext } from '../../../store/Context';
import {
  FilterFieldTitle,
  SelectTextStyle,
} from '../../../styles';
import { stringDropDownValues } from './const';
import { IField } from '../../../types';
import { useFieldsDraggable } from '../../../utils/useFieldsDraggble';
import { Select } from '../../../../select';
import { IDataItem } from '../../../../select/types';
import { Input } from '../../../../input';

export default function SelectStringField({
  item,
  updateField,
  ...props
}: IField) {
  const { dispatch } = useCustomContext();
  const [selectValue, setSelectValue] = useState<IDataItem>(
    stringDropDownValues.find((val) => val.value === item.value[0]) ||
      stringDropDownValues[0]
  );

  const checkFirstValue = (value: string) => {
    dispatch({
      type: 'SET_FILTER_FIELD_VALUE',
      field: {
        ...item,
        value: [item.value[0], value, item.value[2]],
      },
    });
  };

  const changeAttr = (valuesItem: IDataItem[]) => {
    const field = {
      ...item,
      value: [`${valuesItem[0].value}`, item.value[1], item.value[2]],
    };
    dispatch({
      type: "SET_FILTER_FIELD_VALUE",
      field,
    });
    setSelectValue(valuesItem[0]);
    updateField(field, "value");
  };

  const hideField = () => {
    const field = {
      ...item,
      visible: false,
    };
    updateField(field, 'hide');
    dispatch({ type: 'UPDATE_FILTER_FIELD', field });
  };

  const { draggable, events } = useFieldsDraggable();

  return (
    <SelectTextStyle draggable={draggable} {...props}>
      <FilterFieldTitle>{item.title}</FilterFieldTitle>
      <div {...events}>
        <Select
          filterable={false}
          value={selectValue}
          data={item.params.data || stringDropDownValues}
          closeOnSelect={true}
          selectWidth="30%"
          onChange={changeAttr}
        />
        <Input
          // width="67%"
          value={item.value[1]}
          onChange={checkFirstValue}
          onBlur={() => updateField(item, 'value')}
        />
      </div>
      <span></span>
      <span onClick={hideField}></span>
    </SelectTextStyle>
  );
}
