import React, { useCallback } from 'react';
import { useCustomContext } from '../store';
import {
  FirstBodyCellContainer,
  FirstFooterCellContainer,
  FirstHeaderCellContainer,
} from '../styles';
import { TFirstRowCell, TRowItem } from '../types';
import { BurgerMenu } from './BurgerMenu';
import { SettingGrid } from './SettingGrid';

export function FirstRowCell({ location, children }: TFirstRowCell) {
  switch (location) {
    case 'header':
      return FirstHeaderCell();
    case 'footer':
      return FirstFooterCell();
    default:
      return FirstBodyCell(children);
  }
}

const FirstHeaderCell = () => {
  const { state, dispatch } = useCustomContext();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        const checkboxes = state.row.map((item) => item.id);
        state.onChangeCheckboxes(checkboxes);
        dispatch({
          type: 'SET_CHECKED_ID',
          id: checkboxes,
        });
      } else {
        state.onChangeCheckboxes([]);
        dispatch({ type: 'SET_CHECKED_ID', id: [] });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, state.onChangeCheckboxes, state.row]
  );

  return (
    <FirstHeaderCellContainer>
      {state.isShowCheckboxes && (
        <input
          type="checkbox"
          checked={
            state.row.length === state.checkedRowsId.length &&
            state.row.length !== 0
          }
          onChange={onChange}
        />
      )}
      <SettingGrid />
    </FirstHeaderCellContainer>
  );
};

const FirstBodyCell = (item?: TRowItem) => {
  const { state, dispatch } = useCustomContext();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (item) {
      if (e.target.checked) {
        state.onChangeCheckboxes([...state.checkedRowsId, item.id]);
        dispatch({ type: 'SET_CHECKED_ID', id: item.id });
      } else {
        state.onChangeCheckboxes(
          state.checkedRowsId.filter((id) => id !== item.id)
        );
        dispatch({ type: 'DELETE_CHECKED_ID', id: item.id });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch, item, state.onChangeCheckboxes, state.checkedRowsId]) ;

  const onMouseEnter = useCallback(() => {
    if (item) {
      dispatch({ type: 'SET_HOVER_ID', hoverId: item.id });
    }
  }, [dispatch, item]);

  return (
    <FirstBodyCellContainer
      hover={state.hoverId === item?.id}
      onMouseEnter={onMouseEnter}
    >
      {state.isShowCheckboxes && (
        <input
          type="checkbox"
          checked={item && state.checkedRowsId.includes(item.id)}
          onChange={onChange}
        />
      )}
      <BurgerMenu item={item} />
    </FirstBodyCellContainer>
  );
};

const FirstFooterCell = () => {
  return <FirstFooterCellContainer></FirstFooterCellContainer>;
};
