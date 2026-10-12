"use client";
import { useEffect } from "react";
import { Button } from "./_v2/components/ui";
import StatusPage from "./_v2/components/status-page";
import Shell from "./_v2/shell";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for debugging without leaking details to the UI.
    console.error(error);
  }, [error]);

  return (
    <Shell>
      <StatusPage
        code="500"
        title="Something went wrong."
        lead="An unexpected error stopped this page from loading. Try again, or head back to the home page."
        actions={
          <>
            <Button onClick={reset} variant="inverse">
              Try again
            </Button>
            <Button href="/" variant="secondary-light">
              Back home
            </Button>
          </>
        }
      />
    </Shell>
  );
}
