import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // TODO: OTP Verification | Passkey Modal
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container mx-auto">
        <div className="sub-container justify-center max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regualr mt-20 flex justify-between items-center">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 carepulse
            </p>

            <Button variant={"ghost"} className="hover:bg-green-500/10" asChild>
              <Link href={"/?admin=true"} className="text-green-500">
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        width={1000}
        height={1000}
        alt="doctors"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
