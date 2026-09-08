"use client";

export default function SAMLPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-gradient-to-br from-ztred-primary-dark to-ztred-primary-light p-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">
          Sign in with Company SSO
        </h1>
        <div className="bg-theme-card rounded-lg p-6">
          <p className="mb-4 text-center">
            Redirecting to your organization&apos;s SSO portal...
          </p>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ztred-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
}