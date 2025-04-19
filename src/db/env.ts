export const apiVersion = process.env.SANITY_API_VERSION || "2023-06-26";

export const dataset = assertValue(
  process.env.SANITY_DATASET,
  "Missing environment variable: SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.SANITY_PROJECT_ID,
  "Missing environment variable: SANITY_PROJECT_ID"
);

export const token = assertValue(
  process.env.SANITY_TOKEN,
  "Missing environment variable: SANITY_TOKEN"
);

export const useCdn = false;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
