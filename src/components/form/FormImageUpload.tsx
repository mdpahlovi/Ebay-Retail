import { useState } from "react";
import { X } from "lucide-react";
import { useField, useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ErrorMassage from "./ErrorMassage";

export default function FormImageUpload({ name, avatar }: { name: string; avatar?: boolean }) {
    const [{ value }, meta] = useField(name);
    const { setFieldValue } = useFormikContext();
    const [preview, setPreview] = useState<string | ArrayBuffer | null | undefined>(value);

    return (
        <div
            className={`relative border border-dashed overflow-hidden flex items-center justify-center gap-4 ${
                avatar ? "w-56 h-56 rounded-full" : "max-w-lg h-60 rounded"
            }`}
        >
            {preview ? (
                <>
                    <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-1 bottom-1 z-10"
                        onClick={() => {
                            setPreview(null);
                            setFieldValue(name, "");
                        }}
                    >
                        <X />
                    </Button>
                    <img src={preview as string} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </>
            ) : (
                <Label htmlFor="File Upload" className="flex flex-col gap-2.5">
                    <h4 className="text-center">Click To Upload</h4>
                    {avatar ? null : <p className="text-center"> SVG, PNG, JPG or GIF (MAX. 10MB)</p>}
                    <input
                        hidden
                        type="file"
                        name={name}
                        accept="image/*"
                        id="File Upload"
                        onChange={(e) => {
                            const fileReader = new FileReader();
                            fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                    setPreview(fileReader.result);
                                    setFieldValue(name, fileReader.result);
                                }
                            };
                            fileReader.readAsDataURL(e.target.files![0]);
                        }}
                    />
                </Label>
            )}
            <ErrorMassage meta={meta} />
        </div>
    );
}
