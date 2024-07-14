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
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phone_input",
  TEXTAREA = "textarea",
  DATE_PICKER = "date_picker",
  SELECT = "select",
  SKELETON = "skeleton",
}

function AppointmentForm({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AppointmentFormVa>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentForm>) {
    setIsLoading(true);

    try {
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  let buttonLabel;

  switch (type) {
    case "create":
      buttonLabel = "Get Started";
      break;
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Get Started";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700 ">
            Request new appointment in 10 seconds.
          </p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              fieldType={FormFieldType.SELECT}
              placeholder="Select a doctor"
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

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy h:mm aa"
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                control={form.control}
                placeholder="Enter reason for appointment"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Note"
                control={form.control}
                placeholder="Enter notes"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for Cancellation"
            placeholder="Enter a reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
}

export default AppointmentForm;
