import type { ReactNode } from "react";
import BrandLogo from "../../assets/_Tinted Icon.svg";
import { SignInForm } from "./SignInForm";
import { isValidElement } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  backgroundImage: string;
};

export const AuthLayout = ({
  children,
  title,
  subtitle,
  backgroundImage,
}: AuthLayoutProps) => {
  const isSignUpPage = isValidElement(children) && children.type === SignInForm;

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex h-full w-full max-w-7xl max-h-[832px] bg-white">
        <div className="w-full max-w-[549px] p-16 pt-8 flex flex-col justify-start gap-4">
          <div className="mb-6">
            <img
              src={BrandLogo}
              alt="Brand Logo"
              className="max-w-[170.5px] w-full max-h-[45px] h-full"
            />
          </div>

          <h1 className="text-[64px] text-[#222B33] leading-[60px] tracking-[-0.015em] font-semibold">
            {title}
          </h1>
          <p className="text-[18px]  text-[#3b4752] mb-6 font-sans">
            {subtitle}
          </p>

          {children}
        </div>

        <div className="relative max-w-[731px] w-full hidden md:flex justify-center items-end overflow-hidden">
          <img
            src={backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover filter grayscale"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
              opacity: !isSignUpPage ? 0.8 : 0,
            }}
          />
          \
          {!isSignUpPage && (
            <div className="relative z-10 text-white pt-8 pb-16 text-left max-w-[635px]">
              <p className="mb-6  font-[440] text-[48px] leading-[52px] tracking-[-0.015em] text-[#7AFCAA]">
                Blank is the ultimate time saver for small business owners like
                me.
              </p>
              <p className=" font-light text-[36px] leading-[36px] tracking-[-0.01em] font-sans">
                Brittany Stone
              </p>
              <p className="font-sans font-extralight text-[22px] leading-[28px] tracking-[0em] font-sans">
                SnapVision
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
