"use client";

import config from "@/../sanity.config";
import { NextStudio } from "next-sanity/studio";

export default function StudioPage() {
  return (
    <body>
      <NextStudio config={config} />
    </body>
  );
}
