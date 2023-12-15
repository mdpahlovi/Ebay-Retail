/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikHelpers } from "formik";
import { HTMLInputTypeAttribute } from "react";

export interface FormProps extends React.PropsWithChildren {
    initialValues: any;
    validationSchema?: any;
    onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>;
}

export interface FormInputProps {
    type?: HTMLInputTypeAttribute;
    name: string;
    label: string;
    placeholder?: string;
    textarea?: boolean;
    disabled?: boolean;
}

export interface FormSelectProps {
    name: string;
    label: string;
    values: { value: string; text: string }[];
    placeholder?: string;
    disabled?: boolean;
}

export interface FormDatePickerProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
}
