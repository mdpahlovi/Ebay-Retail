import { useFormikContext } from "formik";
import { Button } from "@/components/ui/button";
import { FormSubmitProps } from "@/types/form";
import { DialogClose } from "@/components/ui/dialog";

export default function FormSubmit({ children, loading, dialog }: FormSubmitProps) {
    const { submitForm, errors } = useFormikContext();
    const hasError = Object.keys(errors).length !== 0;

    const SubmitButton = (
        <Button type="button" size="lg" className="mt-2" onClick={submitForm} disabled={hasError}>
            {loading ? "Loading..." : children}
        </Button>
    );

    return dialog ? <DialogClose asChild>{SubmitButton}</DialogClose> : SubmitButton;
}
