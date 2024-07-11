import RegisterForm from "@/components/forms/RegisterForm";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function RegisterationPage({
  params: { userId },
}: SearchParamsProps) {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        width={1000}
        height={1000}
        alt="doctors"
        className="side-img max-w-[380px]"
      />
    </div>
  );
}

interface SearchParamsProps {
  params: {
    userId: string;
  };
}
