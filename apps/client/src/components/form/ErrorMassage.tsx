/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldMetaProps } from "formik";

export default function ErrorMassage({ meta }: { meta: FieldMetaProps<any> }) {
    return meta && meta.touched && meta.error ? <h6 className="mt-0.5 ml-1.5 text-destructive">{meta.error}</h6> : null;
}
