import { cn } from "@/lib/utils";

interface MinimalStepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export default function MinimalStepIndicator({
  steps = ["", ""],
  currentStep = 1,
  className,
}: MinimalStepIndicatorProps) {
  return (
    <nav
      aria-label="Progress"
      className={cn("mx-auto w-full max-w-xs pb-4", className)}
    >
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li
            key={`step-${step}`}
            className={cn(
              "flex items-center",
              index !== steps.length - 1 && "w-full",
            )}
          >
            <div className="relative flex w-20 flex-col items-center">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full",
                  index + 1 <= currentStep
                    ? "bg-primary text-background"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {index + 1}
              </div>
              <span
                className={cn(
                  "absolute top-[30px] text-sm",
                  index + 1 <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div className={cn("h-[2px] w-full bg-gray-200")} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
