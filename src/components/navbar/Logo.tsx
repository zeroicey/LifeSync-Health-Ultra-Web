import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="LifeSync Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <span className="text-xl font-bold text-blue-600">LifeSync</span>
      </Link>
    </div>
  );
};

export default Logo;
