"use server";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;
export async function QueryJobs(query: string, userId: string) {
  try {
    if (!query || !userId) throw new Error(`${!query ? 'Need a valid query' : 'No user Id'}`)
    const res = await fetch(baseUrl + `/query-jobs/${query}/${userId}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to connect to API`);
    }
    const data = await res.json();
    if (data.success) {
      return {
        success: true,
        message: "fetched jobs matching condition",
        jobs: data.jobs || []
      };
    } else {
      throw new Error(data.message);
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: `failed to fetch job: ` + err,
      jobs: []
    };
  }
}
