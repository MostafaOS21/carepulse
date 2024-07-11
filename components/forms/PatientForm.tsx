"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phone_input",
  TEXTAREA = "textarea",
  DATE_PICKER = "date_picker",
  SELECT = "select",
  SKELETON = "skeleton",
}

function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
      };

      const user = await createUser(userData);

      console.log(user);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700 ">Schedule your first appointment. </p>
        </section>

        <CustomFormField
          control={form.control}
          name="fullName"
          label="Full name"
          fieldType={FormFieldType.INPUT}
          placeholder="Folan Ibn Folan"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          fieldType={FormFieldType.INPUT}
          placeholder="folanibnfolan@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          control={form.control}
          name="phone"
          label="Phone number"
          fieldType={FormFieldType.PHONE_INPUT}
          placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}

export default PatientForm;
