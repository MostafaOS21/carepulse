"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { registerPatient } from "@/lib/actions/patient.actions";

function RegisterForm({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      fullName: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;

    console.log("Submitting");

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob(values.identificationDocument, {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate).toISOString(),
        identificationDocument: formData,
      };

      // @ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${patient.$id}/new-appointment`);
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                  className="flex items-center justify-between h-11 gap-6"
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
            name="allergies"
            label="Allergies (if any)"
            fieldType={FormFieldType.TEXTAREA}
            placeholder="Peanuts, Penicillin, Pollan"
          />
          <CustomFormField
            control={form.control}
            name="currentMedication"
            label="Current Medication (if any)"
            fieldType={FormFieldType.TEXTAREA}
            placeholder="Ibuprofen 200mg, Paracetamol 500mg"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomFormField
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            fieldType={FormFieldType.TEXTAREA}
            placeholder="Mother had diabetes, Father had heart disease"
          />
          <CustomFormField
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            fieldType={FormFieldType.TEXTAREA}
            placeholder="Appendectomy, Tonsillectomy"
          />
        </div>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          name="identificationType"
          label="Identification Type"
          fieldType={FormFieldType.SELECT}
          placeholder="Select   identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          fieldType={FormFieldType.INPUT}
          placeholder="123456789"
        />

        <CustomFormField
          control={form.control}
          name="identificationDocument"
          label="Scanned Copy of Identification Document"
          fieldType={FormFieldType.SKELETON}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to receive treatment"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to the disclosure of my medical information"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to the privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
