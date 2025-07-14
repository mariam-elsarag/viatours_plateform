import { Dropdown } from "primereact/dropdown";
import { InputOtp } from "primereact/inputotp";
import { MultiSelect } from "primereact/multiselect";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import Input_Password from "./Input_Password";
import type { FC } from "react";

type FormType =
  | "input"
  | "otp"
  | "phone_number"
  | "password"
  | "dropdown"
  | "multiselect"
  | "textarea";

type FormItem = {
  id: string;
  name: string;
  fieldName: string;
  formType: FormType;
  type?: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  optionList?: any[];
  hasFilter?: boolean;
  value?: any;
  placeholder?: string;
  className?: string;
  validator?: object;
  info?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  autFocus?: boolean;
  action?: (e: any) => void;
  onInput?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: any
  ) => void;
};
interface FormBuilderProps {
  formList: FormItem[];
  control: Control<any>;
  errors: FieldErrors;
  loading?: boolean;
}
const Form_Builder: FC<FormBuilderProps> = ({
  formList = [],
  control,
  errors,
  loading,
}) => {
  const renderField = (item: FormItem, field: any, error: any) => {
    const isInvalid = !!(error?.message || errors?.[item?.fieldName]?.message);

    switch (item.formType) {
      case "input":
        return (
          <section className="flex flex-col gap-1">
            <div
              className={`flex input gap-2 ${
                item.disabled || loading ? "disabled" : ""
              } ${isInvalid ? "error" : ""} ${
                field?.value ? "fill" : ""
              } focus-within:!border-primary-500`}
            >
              {item.icon && <span className="flex_center">{item.icon}</span>}
              <input
                id={item.id}
                name={item.name}
                type={item.type}
                onChange={(e) => {
                  field.onChange(e);
                  item.action?.(e);
                }}
                value={field.value || item.value}
                disabled={item.disabled || loading}
                placeholder={item.placeholder || ""}
                className={`flex-1 w-full ${item.inputClassName || ""}`}
                min={0}
                onWheel={(e) => e.currentTarget.blur()}
                onInput={(e) => item.onInput?.(e, field)}
                autoFocus={item.autFocus}
              />
            </div>
          </section>
        );

      case "otp":
        return (
          <div dir="ltr">
            <InputOtp
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              disabled={item.disabled || loading}
              integerOnly
              className="otp"
              length={6}
              inputProps={{ autoComplete: "off" }}
              invalid={isInvalid}
            />
          </div>
        );

      case "phone_number":
        return (
          <section className="flex flex-col gap-1">
            <div
              className={`flex flex-row-reverse input gap-2 ${
                item.disabled || loading ? "disabled" : ""
              } ${isInvalid ? "error" : ""} focus-within:!border-primary-500`}
            >
              <input
                id={item.id}
                name={item.name}
                type="tel"
                onChange={(e) => {
                  field.onChange(e);
                  item.action?.(e);
                }}
                autoFocus
                value={field.value}
                disabled={item.disabled || loading}
                placeholder={item.placeholder || ""}
                className={`flex-1 w-full ${item.inputClassName || ""}`}
                min={0}
                onWheel={(e) => e.currentTarget.blur()}
                onInput={(e) => item.onInput?.(e, field)}
              />
              <span className="flex_center" dir="ltr">
                +966
              </span>
            </div>
          </section>
        );

      case "password":
        return (
          <Input_Password
            error={isInvalid}
            handleChange={(e: any) => field.onChange(e)}
            value={field.value}
            disabled={item.disabled || loading}
            item={item}
          />
        );

      case "dropdown":
        return (
          <Dropdown
            options={item.optionList}
            value={field.value}
            onChange={(e) => {
              item.action?.(e.value);
              field.onChange(e);
            }}
            disabled={item.disabled || loading || item.loading}
            placeholder={item.placeholder || ""}
            className={`flex-1 w-full !p-0 form_dropdown ${
              isInvalid ? "input_error" : ""
            }`}
            optionLabel="name"
            inputId={item.id}
            filter={item.hasFilter || false}
            loading={!!item.loading}
          />
        );

      case "multiselect":
        return (
          <MultiSelect
            options={item.optionList}
            value={field.value}
            onChange={(e) => field.onChange(e)}
            disabled={item.disabled || loading}
            placeholder={item.placeholder || ""}
            className={`flex-1 w-full !p-0 ${
              item.disabled || loading ? "disabled_input" : ""
            } ${isInvalid ? "input_error" : ""} ${item.icon ? "icon" : ""}`}
            optionLabel="name"
            inputId={item.id}
            filter={item.hasFilter || false}
            maxSelectedLabels={2}
          />
        );

      case "textarea":
        return (
          <section className="flex flex-col gap-1">
            <div
              className={`flex items-start textarea gap-2 ${
                item.disabled || loading ? "disabled" : ""
              } ${isInvalid ? "error" : ""} focus-within:!border-primary-500`}
            >
              {item.icon && <span className="flex_center">{item.icon}</span>}
              <textarea
                id={item.id}
                name={item.name}
                onChange={field.onChange}
                value={field.value}
                disabled={item.disabled || loading}
                placeholder={item.placeholder || ""}
                className={`flex-1 ${item.inputClassName || ""}`}
              />
            </div>
          </section>
        );

      default:
        return <></>;
    }
  };
  return (
    <>
      {formList?.map((item) => (
        <fieldset
          key={item.id}
          className={`grid gap-2 content-baseline ${item.className || ""}`}
        >
          {item.label && (
            <label
              className={`label title_lg font-medium ${
                item.labelClassName || ""
              }`}
              htmlFor={item.id}
              dangerouslySetInnerHTML={{ __html: item.label }}
            />
          )}
          <Controller
            name={item.fieldName}
            control={control}
            rules={item.validator}
            render={({ field, fieldState: { error } }) =>
              renderField(item, field, error)
            }
          />
          {item.info && !errors?.[item.fieldName]?.message && (
            <p className="text-neutral-500 label_md">{item.info}</p>
          )}
          {errors?.[item.fieldName]?.message && (
            <p className="flex_center_y gap-1">
              <span className="label_md text-error-500">
                {errors[item.fieldName]?.message}
              </span>
            </p>
          )}
        </fieldset>
      ))}
    </>
  );
};

export default Form_Builder;
