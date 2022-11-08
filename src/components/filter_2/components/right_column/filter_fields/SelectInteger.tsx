import React, { useState } from 'react';
import { Input, Select } from '../../../../../';
import { IDataItem } from '../../../../select';
import { useCustomContext } from '../../../store/Context';
import { FilterFieldTitle, SelectTextStyle } from '../../../styles';
import { IField } from '../../../types';
import { useFieldsDraggable } from '../../../utils/useFieldsDraggble';
import { integerDropDownValues } from './const';

export default function SelectIntegerField({
  item,
  updateField,
  ...props
}: IField) {
  const { dispatch } = useCustomContext();
  const { draggable, events } = useFieldsDraggable();

  const [selectValue, setSelectValue] = useState<IDataItem>(
    integerDropDownValues.find((val) => val.value === item.value[0]) ||
    integerDropDownValues[0]
  );

  const checkFirstValue = (value: string) => {
    if (value.match(/^\d*$/)) {
      dispatch({ type: 'SET_FILTER_FIELD_VALUE', field: { ...item, value: [item.value[0], value, item.value[2]] } });
    }
  };

  const checkSecondValue = (value: string) => {
    if (value.match(/^\d*$/)) {
      dispatch({ type: 'SET_FILTER_FIELD_VALUE', field: { ...item, value: [item.value[0], item.value[1], value] } });
    }
  };

  const changeAttr = (valuesItem: IDataItem[]) => {
    const field = { ...item, value: [`${valuesItem[0].value}`, item.value[1], item.value[2]] };
    dispatch({ type: "SET_FILTER_FIELD_VALUE", field, });
    setSelectValue(valuesItem[0]);
    updateField(field, "value");
  };

  const hideField = () => {
    const field = { ...item, visible: false };
    updateField(field, 'hide');
    dispatch({ type: 'UPDATE_FILTER_FIELD', field });
  };

  return (
    <SelectTextStyle draggable={draggable} {...props}>
      <FilterFieldTitle>{item.title}</FilterFieldTitle>
      <div {...events}>
        <Select
          filterable={false}
          value={selectValue}
          data={item?.options?.variants || integerDropDownValues}
          closeOnSelect={true}
          selectWidth="33%"
          onChange={changeAttr}
        />
        {selectValue.title === 'Диапазон' ? (
          <>
            <Input
              width="33%"
              value={item.value[1]}
              onChange={checkFirstValue}
              onBlur={() => updateField(item, 'value')}
            />
            <Input
              width="33%"
              value={item.value[2]}
              onChange={checkSecondValue}
              onBlur={() => updateField(item, 'value')}
            />
          </>
        ) : (
          <Input
            width="67%"
            value={item.value[1]}
            onChange={checkFirstValue}
            onBlur={() => updateField(item, 'value')}
          />
        )}
      </div>
      <span></span>
      <span onClick={hideField}></span>
    </SelectTextStyle>
  );
}
