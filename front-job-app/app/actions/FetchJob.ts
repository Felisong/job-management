"use server";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default async function FetchJob(jobId: string) {
  try {
    const res = await fetch(baseUrl + `/job-info/${jobId}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Unable to communicate with API");
    }
    const data = await res.json();
    if (data.success) {
      return {
        success: true,
        message: "got job information",
        jobData: data.jobData,
      };
    } else {
      throw new Error("connected to API but failed to fetch information");
    }
  } catch (err: unknown) {
    console.error(`error in fetching job: ` + err);
    return {
      success: false,
      message: "failed to get job information",
    };
  }
}
