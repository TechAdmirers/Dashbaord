import React from "react";

export default function ClerkCentered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="flex flex-col items-center w-full max-w-lg">
        {children}
      </div>
    </div>
  );
} 