import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface ButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  const content = isLoading ? (
    <div className="flex items-center gap-4">
      <Image
        src="/assets/icons/loader.svg"
        width={22}
        height={22}
        alt="loader"
      />
      Loading...
    </div>
  ) : (
    children
  );

  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {content}
    </Button>
  );
};

export default SubmitButton;
