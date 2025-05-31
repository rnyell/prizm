"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full grid place-content-center gap-4">
      <h2 className="font-semibold">Something went wrong!</h2>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="secondary">Home</Button>
        </Link>
        <Button variant="secondary" onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
