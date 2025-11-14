"use client";

import React, { useEffect } from "react";
import { MiniAppProvider, useMiniApp } from "@neynar/react";

/**
 * This wrapper exposes Neynar MiniApp context to children.
 * The actual favorite popup trigger is in Home (page.tsx).
 */

export default function MiniAppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MiniAppProvider>
      {children}
    </MiniAppProvider>
  );
}
