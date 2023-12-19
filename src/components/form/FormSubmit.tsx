import { useFormikContext } from "formik";
import { Button } from "@/components/ui/button";

export default function FormSubmit({ children, loading }: { loading?: boolean } & React.PropsWithChildren) {
    const { submitForm, errors } = useFormikContext();
    const hasError = Object.keys(errors).length !== 0;

    return (
        <Button type="button" size="lg" className="mt-2" onClick={submitForm} disabled={hasError}>
            {loading ? "Loading..." : children}
        </Button>
    );
}
