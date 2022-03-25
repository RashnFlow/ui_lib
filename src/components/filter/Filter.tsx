import React from "react";
import { useCustomContext, FilterContextProvider } from "./store/Context";
import { FilterContainer, FilterMenuContainer } from "./styles";
import { TProps } from "./types";
import { LeftColumn } from "./components/LeftColumn";
import { RightColumn } from "./components/RightColumn";
import { useShowControl } from "../../hooks";

/**
 * @param filters array of filters;
 * @param currentFilter текущий фильтр
 * @param fields array of fields;
 * @callback setCurrentFilter return filter onClick
 * @callback createFilter return filter {title, visible, order}
 * @callback updateFilter return filter {id, title, visible, order}
 * @callback deleteFilter return filter ID
 * @callback updateFiltersOrder return all filters with new order
 * @callback updateField return field {}
 * @callback updateFieldsOrder (f: TField[]) => void;
 * @callback returnDefaultFields () => void;
 * @callback onSearch (response: string) => void;
 * @callback onClearFilter () => void;
 * @callback getSelectItems TGetSelectItems;
 * @type Filter 
 * {title: string;  
 * visible: boolean;  
 * order: number;}
 * @type Field 
 * {id: number;  
 * filterId: number;  
 * order: number;  
 * value: string[];  
 * type: string;
 * title: string;
 * queryKey: string;
 * code: string;
 * visible: boolean;}
 */
export function Filter(props: TProps) {
  return (
    <FilterContextProvider {...props}>
      <Provider />
    </FilterContextProvider>
  );
}

function Provider() {
  const { state, dispatch } = useCustomContext();
  const { ref, isShow, setShow } = useShowControl();

  const deleteCurrentFilter = () => {
    dispatch({ type: "DELETE_CURRENT_FILTER" });
  };

  if (!state.currentFilter) {
    return null;
  }

  return (
    <>
      <FilterContainer ref={ref}>
        <div onClick={() => setShow(true)}>
          {state.currentFilter.title === "" ? (
            <div>
              {state.currentFilter.title}
              <button onClick={deleteCurrentFilter}></button>
            </div>
          ) : (
            <p>Фильтр + поиск</p>
          )}
          <button></button>
        </div>
        <FilterMenuContainer isShow={isShow}>
          <LeftColumn />
          <RightColumn setShowFilter={setShow} />
        </FilterMenuContainer>
      </FilterContainer>
    </>
  );
}
