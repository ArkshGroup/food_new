import React from "react";
import { Lock } from "lucide-react"; // Importing the Lock icon for access denial

/**
 * @typedef {object} AccessDeniedContainerProps
 * Renders a container for an "Access Denied" message, styled with shadcn/ui principles.
 */
const AccessDeniedContainer = () => {
  return (
    // Outer container for centering and full screen height
    <div className="flex items-center justify-center min-h-[50vh] p-4">
      {/* The main access denied card/container */}
      <div
        className="flex flex-col items-center justify-center p-8 sm:p-12 max-w-lg w-full 
                      bg-card text-card-foreground rounded-lg shadow-xl border border-border"
      >
        {/* Icon */}
        <div
          className="mb-6 p-4 rounded-full 
                        bg-primary text-primary-foreground 
                        shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <Lock className="w-10 h-10" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-primary">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-center text-muted-foreground mb-6 text-base sm:text-lg">
          You do not have the necessary permissions to view this page or
          resource.
        </p>

        {/* Optional: Small text hint */}
        <p className="text-xs text-secondary-foreground/60 mt-4">
          If you believe this is an error, please contact your administrator.
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedContainer;
