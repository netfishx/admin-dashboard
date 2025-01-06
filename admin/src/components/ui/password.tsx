"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowBigUpDash, EyeIcon, EyeOffIcon } from "lucide-react";
import {
  type ComponentType,
  type InputHTMLAttributes,
  type KeyboardEventHandler,
  type RefObject,
  type SVGProps,
  useState,
} from "react";

export function Password({
  ref,
  Icon,
  className,
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  ref?: RefObject<HTMLInputElement>;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const capsLockOn = event.getModifierState("CapsLock");
    setCapsLockActive(capsLockOn);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const inputClasses = cn(
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    Icon && "pl-10",
    type === "password" && (capsLockActive ? "pr-16" : "pr-8"),
    className,
  );

  return (
    <div className={cn("relative", className)}>
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon />
        </div>
      )}
      <input
        type={type === "password" && showPassword ? "text" : type}
        className={inputClasses}
        onKeyDown={handleKeyPress}
        ref={ref}
        autoComplete="password"
        {...props}
      />
      {type === "password" && (
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-x-1 pr-3">
          {showPassword ? (
            <EyeOffIcon
              className="cursor-pointer"
              onClick={togglePasswordVisibility}
              size={16}
            />
          ) : (
            <EyeIcon
              className="cursor-pointer"
              onClick={togglePasswordVisibility}
              size={16}
            />
          )}
          {capsLockActive && type === "password" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ArrowBigUpDash size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Caps Lock is on!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </div>
  );
}
