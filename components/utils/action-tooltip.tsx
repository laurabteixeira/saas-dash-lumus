import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface ActionTooltipProps {
  label: string | boolean;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const ActionTooltip = ({ label, children, side, align }: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-white text-black border-none shadow-md" side={side} align={align}>
          <p className="font-medium text-muted-foreground text-[13px]">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
