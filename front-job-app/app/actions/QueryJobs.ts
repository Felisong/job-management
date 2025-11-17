"use server";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;
export async function QueryJobs(query: string) {
    console.log(`i get to the server: `, query)
  try {
    const res = await fetch(baseUrl + `/query-jobs/${query}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to connect to API`);
    }
    const data = await res.json();
    if (data.success) {
      return {
        success: true,
        message: "deleted job",
        jobs: data.jobs || []
      };
    } else {
      throw new Error(data.message);
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: `failed to delete job: ` + err,
      jobs: []
    };
  }
}
