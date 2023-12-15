import { useState } from "react";
import { useField } from "formik";
import { FormInputProps } from "@/types/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import ErrorMassage from "./ErrorMassage";

const FormInput = ({ type = "text", name, label, placeholder, textarea, disabled }: FormInputProps) => {
    const [field, meta] = useField(name);
    const [show, setShow] = useState(false);
    const config = { id: name, ...field, placeholder, disabled };

    return (
        <div className="relative">
            <Label htmlFor={name} className="block mb-2">
                {label}
            </Label>
            {textarea ? (
                <Textarea {...config} />
            ) : type === "password" ? (
                <>
                    <Input type={show ? "text" : "password"} {...config} />
                    <button className="absolute top-8 right-2.5 text-input" onClick={() => setShow(!show)}>
                        {show ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                </>
            ) : (
                <Input type={type} {...config} />
            )}
            <ErrorMassage meta={meta} />
        </div>
    );
};

export default FormInput;
