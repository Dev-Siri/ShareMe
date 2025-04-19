import { createClient } from "next-sanity";
import "server-only";

import { apiVersion, dataset, projectId, token, useCdn } from "../env";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
});

export default client;
