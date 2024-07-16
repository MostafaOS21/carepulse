"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { decryptKey, encryptKey } from "@/lib/utils";

const PassKeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [passKey, setPassKey] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const encryptedPassKey =
    typeof window !== "undefined" ? localStorage.getItem("passKey") : null;

  useEffect(() => {
    const accessKey = encryptedPassKey && decryptKey(encryptedPassKey);

    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        const encryptedKey = encryptKey(passKey);
        localStorage.setItem("passKey", encryptedKey);

        setIsOpen(false);
        router.push("/admin");
      } else {
        setIsOpen(true);
      }
    }
  }, [encryptKey]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      localStorage.setItem("passKey", encryptedKey);

      setIsOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        if (!val) router.push("/");
      }}
    >
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            Admin Access Verification
            <AlertDialogCancel asChild className="border-0">
              <Button variant={"ghost"}>
                <Image
                  src="/assets/icons/close.svg"
                  alt="close"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </Button>
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin dashboard, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP maxLength={6} value={passKey} onChange={setPassKey}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 text-center">
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction onClick={validatePasskey} asChild>
            <Button className="shad-primary-btn w-full">
              Enter admin passkey
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
