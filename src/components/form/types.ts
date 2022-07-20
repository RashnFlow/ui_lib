import { RichTextValue, IRichTextProps } from './../richtext/types';
import { MultifieldItemProps, IMultifieldProps } from './../multifield/types';
import { IFileInputProps, FileInputPropsValue, IFileInputItem } from './../file_input/types';
import { IDataItem } from './../select/types';
import { CheckboxValue, ICheckboxProps } from './../checkbox/types';
import { IDatePicker } from '../date_picker/types';
import { ISelectProps, SelectPropsValue } from '../select/types';
import { IInputProps, InputValue } from '../input/types';
import { ErrorsItem } from './components/field/types';

export interface IFormProps {
  fields: FormFieldsItem[];
  values?: FormValues;
  mode?: FormMode;
  canToggleMode?: boolean;
  validationRules?: ValidationItem[];
  formTitle?: string;
  width?: string;
  height?: string;
  onFieldChange?: (field: FormFieldsItemShort, values: FormValues) => void;
  onSubmit?: (form: FormValues) => Promise<any>;
  onAfterSubmit?: (response: any) => void;
  onInit?: (form: FormValues) => void;
  onEditEnd?: () => void;
}

export type FormMode = "edit" | "view";

export interface FormFieldsItemGeneric {
  name: string;
  label?: string;
  labelSuffix?: string;
  readonly?: boolean;
}

export type FormFieldsItem = FormFieldsItemGeneric &
  (
    | {type: 'input', value?: InputValue, fieldParams?: IInputProps}
    | {type: 'select', value?: SelectPropsValue, fieldParams?: ISelectProps}
    | {type: 'date', value: string, fieldParams?: IDatePicker}
    | {type: 'checkbox', value?: CheckboxValue, fieldParams?: ICheckboxProps}
    | {type: 'file', value?: FileInputPropsValue, fieldParams?: IFileInputProps}
    | {type: 'multifield', value?: MultifieldItemProps[], fieldParams?: IMultifieldProps}
    | {type: 'richtext', value?: RichTextValue, fieldParams?: IRichTextProps}
  )

export type FormFieldsItemShort = {
  name: string;
  value: any; // TODO: Переписать на типы значений компонентов
}

export interface IFormProviderProps extends IFormProps {
  children: JSX.Element
}

export type FormValues = {
  [key: string]: InputValue|IDataItem[]|CheckboxValue|string|IFileInputItem[]
}

export type IFormReducerAction = 
  | { type: "toggle_mode" }
  | { type: "submit_form" }
  | { type: "undo_changes" }
  | { type: "set_errors", errors: ErrorsItem[] }
  | { type: "set_field", field: FormFieldsItemShort }
  | { type: "set_form", form: {errors: ErrorsItem[], field: FormFieldsItemShort} }

export interface IFormReducerProps {
  fields: FormFieldsItem[];
  values: FormValues;
  mode: FormMode;
  validationRules: ValidationItem[];
  onFieldChange: (field: FormFieldsItemShort, values: FormValues) => void;
}

export interface IFormReducerState {
  errors: ErrorsItem[];
  values: FormValues;
  fields: FormFieldsItem[];
  tempValues: FormValues;
  validationRules: ValidationItem[];
  mode: FormMode;
  inited: boolean;
  onFieldChange: (field: FormFieldsItemShort, values: FormValues) => void;
}

/* Validation */
export type ValidationTypes = 
  'required'|'string'|'integer'|'double'|'match'|'email'|'in'|'date'|'time'|'link'|'each';

export type ValidationRules = {
  message: string;
  [key: string]: string|number
};

export type ValidationItemGeneric = {
  fields: string[];
}

export type ValidationItem = ValidationItemGeneric & (
  | IAutoHandlingCase
  | IPrimitiveCase
  | IMatchCase
  | IInCase
  | IEachCase
)

export interface IAutoHandlingCase {
  type: 'required'|'email'|'date'|'time'|'link', rules: {message: string}
}

export interface IPrimitiveCase {
  type: 'string'|'integer'|'double', 
  rules?: {min?: number, max?: number, message?: string}
}

export interface IMatchCase {
  type: 'match', 
  rules?: {pattern?: string, message?: string}
}

export interface IInCase {
  type: 'in', 
  rules?: {range?: string|number[], message?: string}
}

export interface IEachCase {
  type: 'each',
  rules: {rule?: {
    "0": ValidationTypes,
    [key: string]: any
  }}
}

export interface IFormValidatorGeneric {
  target: FormFieldsItemShort;
  result: IValidationErrorItem[]
}

export interface IAutoHandlingValidator extends IFormValidatorGeneric {
  item: IAutoHandlingCase
}

export interface IPrimitiveValidator extends IFormValidatorGeneric {
  item: IPrimitiveCase
}

export interface IMatchValidator extends IFormValidatorGeneric {
  item: IMatchCase
}

export interface IInValidator extends IFormValidatorGeneric {
  target: {
    name: string;
    value: string|number
  }
  item: IInCase
}

export interface IEachValidator extends IFormValidatorGeneric {
  target: {
    name: string;
    value: any[]
  }
  item: IEachCase
}

export interface IValidationErrorItem {
  field: string;
  message: string;
}
