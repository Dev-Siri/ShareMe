import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { apiVersion, dataset, projectId } from "@/db/env";
import schemaTypes from "@/db/schema";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [deskTool(), visionTool({ defaultApiVersion: apiVersion })],
});
