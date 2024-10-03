import { cn } from "@/lib/utils";

interface MonitorFrameProps {
  className?: string;
  color?: "black" | "silver" | "white";
}

export default function MonitorFrame({
  className,
  color = "black",
}: MonitorFrameProps) {
  const colorClasses = {
    black: "bg-gray-900 border-gray-800",
    silver: "bg-gray-300 border-gray-400",
    white: "bg-gray-100 border-gray-200",
  };

  return (
    <div className={cn("relative mx-auto", className)}>
      {/* Monitor Frame */}
      <div
        className={cn(
          "relative rounded-lg overflow-hidden border-[10px]", // Reduced border size
          colorClasses[color],
          "w-full max-w-[500px] aspect-video" // Reduced max width for smaller frame
        )}
      >
        {/* Screen */}
        <div className="absolute inset-0 overflow-hidden bg-white">
          {/* {children} */}
        </div>
        {/* Webcam */}
        <div className="absolute w-2 h-2 -translate-x-1/2 rounded-full top-1 left-1/2 bg-black/20"></div>{" "}
        {/* Reduced webcam size */}
      </div>
      {/* Monitor Stand */}
      <div
        className={cn(
          "mx-auto",
          color === "black"
            ? "bg-gray-800"
            : color === "silver"
            ? "bg-gray-400"
            : "bg-gray-200",
          "w-1/5 h-3 rounded-b-lg" // Reduced stand width and height
        )}
      ></div>
      <div
        className={cn(
          "mx-auto",
          color === "black"
            ? "bg-gray-800"
            : color === "silver"
            ? "bg-gray-400"
            : "bg-gray-200",
          "w-1/8 h-12 rounded-b-lg" // Reduced second part of stand
        )}
      ></div>
      <div
        className={cn(
          "mx-auto",
          color === "black"
            ? "bg-gray-800"
            : color === "silver"
            ? "bg-gray-400"
            : "bg-gray-200",
          "w-1/4 h-1.5 rounded-lg mt-1" // Reduced base width and height
        )}
      ></div>
      {/* Monitor Shadow */}
      <div className="absolute w-2/3 h-3 transform -translate-x-1/2 rounded-full -bottom-3 left-1/2 bg-black/20 blur-md"></div>{" "}
      {/* Reduced shadow size */}
    </div>
  );
}
