"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";

function RegisterForm({ user }: { user: User }) {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700 ">Let us know more about yourself.</p>
        </section>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          name="fullName"
          label="Full Name"
          fieldType={FormFieldType.INPUT}
          placeholder="Folan Ibn Folan"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col xl:flex-row gap-6">
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
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="birthDate"
            label="Date of birth"
            fieldType={FormFieldType.DATE_PICKER}
          />

          <CustomFormField
            control={form.control}
            name="gender"
            label="Gender"
            fieldType={FormFieldType.SKELETON}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomFormField
            control={form.control}
            name="address"
            label="Address"
            fieldType={FormFieldType.INPUT}
            placeholder="14th Street, Cairo, Egypt"
          />
          <CustomFormField
            control={form.control}
            name="occupation"
            label="Occupation"
            fieldType={FormFieldType.INPUT}
            placeholder="Software Engineer"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomFormField
            control={form.control}
            name="emergencyContactName"
            label="Emergency Contact Name"
            fieldType={FormFieldType.INPUT}
            placeholder="Guradian's Name"
          />
          <CustomFormField
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            fieldType={FormFieldType.PHONE_INPUT}
            placeholder="(555) 123-4567"
          />
        </div>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          fieldType={FormFieldType.SELECT}
          placeholder="Select a physician"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="cursor-pointer flex items-center gap-2">
                <Image
                  src={doctor.image}
                  height={32}
                  width={32}
                  className="rounded-full border border-dark-500"
                  alt={`avatar of doctor ${doctor.name}`}
                />

                {doctor.name}
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomFormField
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            fieldType={FormFieldType.INPUT}
            placeholder="BlueCross BlueShield"
          />
          <CustomFormField
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            fieldType={FormFieldType.INPUT}
            placeholder="ABC123456789"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomFormField
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            fieldType={FormFieldType.INPUT}
            placeholder="BlueCross BlueShield"
          />
          <CustomFormField
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            fieldType={FormFieldType.INPUT}
            placeholder="ABC123456789"
          />
        </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
