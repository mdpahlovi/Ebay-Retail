/* eslint-disable @typescript-eslint/no-explicit-any */
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Header from "@/components/ui/header";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { contacts } from "@/components/main/contact/data";
import { createElement, useState } from "react";
import contactSchema from "@/validations/contactSchema";

type Values = { name: string; email: string; subject: string; body: string };
const initialValues = { name: "", email: "", subject: "", body: "" };
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (data: Values) => {
        setLoading(true);
        emailjs.send("ebay-retail", "ebay-retail", data, publicKey).then(
            (result) => {
                setLoading(false);
                if (result.text === "OK") toast.success("Email Sent Successfully");
            },
            (error: any) => {
                setLoading(false);
                toast.error(error.text);
            }
        );
    };

    return (
        <>
            <Header title="Get in touch with us" />
            <section className="grid items-center md:grid-cols-2 gap-10">
                <div className="divide-y">
                    {contacts.map(({ icon, title, details }, idx) => (
                        <div key={idx} className="py-5 flex gap-4">
                            {createElement(icon)}
                            <div className="space-y-0.5">
                                <h5>{title}</h5>
                                <h6>{details}</h6>
                            </div>
                        </div>
                    ))}
                </div>
                <Form initialValues={initialValues} validationSchema={contactSchema} onSubmit={handleSubmit}>
                    <FormInput name="name" label="Your Name" />
                    <FormInput type="email" name="email" label="Your Email" />
                    <FormInput name="subject" label="Subject" />
                    <FormInput name="body" label="Message" textarea />
                    <FormSubmit loading={loading}>Submit</FormSubmit>
                </Form>
            </section>
        </>
    );
}
