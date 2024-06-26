'use client'
import { Controller, UseFormReturn } from "react-hook-form"
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { FocusEventHandler, ReactNode } from "react";
import { FormReturn, MethodName, SelectAttributes } from "@/type";

type SelectFormAttributes = {
    instanceId: string;
    methodName: MethodName;
    method: FormReturn;
    className?: string;
    title: string;
    defaultValue?: { value: string | number | boolean | undefined; label: string | number | boolean | undefined };
    placeholder?: string;
    options: SelectAttributes[]
    isMulti?: boolean;
    blur?: FocusEventHandler<HTMLInputElement> | undefined;
    change?: (newValue: MultiValue<{}> | SingleValue<{}>, actionMeta: ActionMeta<{}>) => void;
    disabled?: boolean;
    val?: { value: string | number | boolean | undefined; label: string | number | boolean | undefined }
}

function SelectForm
    ({ method, methodName, options, title, val, className, defaultValue, disabled, isMulti, blur, change, placeholder, instanceId }: SelectFormAttributes): ReactNode {
    const { error } = method.getFieldState(methodName)
    return (
        <div className={`w-full space-y-1 ${className}`}>
            <h1 className="md:mx-0 text-md font-montserrat font-semibold text-gray-700">{title}</h1>
            <Controller
                control={method.control}
                name={methodName}
                defaultValue={defaultValue}
                render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                }) => {
                    return <Select
                        instanceId={instanceId}
                        className={className}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                borderRadius: "0px",
                                paddingTop: "1px",
                                paddingBottom: "1px",
                                borderWidth: "2px",
                            }),
                        }}
                        classNamePrefix="select"
                        placeholder={placeholder}
                        options={options}
                        isMulti={isMulti}
                        onBlur={blur}
                        onChange={(e: SingleValue<{}>) => {
                            onChange(e);
                        }}
                        isDisabled={disabled}
                        ref={ref}
                        value={change ? val : options?.find((o: SelectAttributes) => o.value === value) || {}}
                    />
                }}
            />
            {error && <p className='text-red-600 mt-1 mx-1'>{error.message}</p>}
        </div>
    );
}

export default SelectForm
