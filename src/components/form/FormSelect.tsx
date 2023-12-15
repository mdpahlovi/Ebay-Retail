import { FormSelectProps } from "@/types/form";
import { useField, useFormikContext } from "formik";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import ErrorMassage from "./ErrorMassage";

export default function FormSelect({ name, label, values, placeholder, disabled }: FormSelectProps) {
    const [{ value }, meta] = useField(name);
    const { setFieldValue } = useFormikContext();
    const config = { value, disabled };

    return (
        <div>
            <Label htmlFor={name} className="block mb-2">
                {label}
            </Label>
            <Select {...config} onValueChange={(value) => setFieldValue(name, value)}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {values.map(({ value, text }, idx) => (
                            <SelectItem key={idx} value={value}>
                                {text}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <ErrorMassage meta={meta} />
        </div>
    );
}
