/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldMetaProps } from "formik";

export default function ErrorMassage({ meta }: { meta: FieldMetaProps<any> }) {
    return meta && meta.touched && meta.error ? <p className="mt-0.5 ml-1.5 text-sm text-destructive">{meta.error}</p> : null;
}
