"use server";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default async function FetchJob(jobId: string, userId: string) {
  try {
    console.log(`PING`)
    const res = await fetch(baseUrl + `/job-info/${jobId}/${userId}`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(`data: `, data)
    if (!res.ok) {
      throw new Error(data.message);
    }
    if (data.success) {
      return {
        success: true,
        message: "got job information",
        jobData: data.jobData,
      };
    } else {
      throw new Error(data.message);
    }
  } catch (err: unknown) {
    console.error(`Error in fetching job: ` + err);
    return {
      success: false,
      message: String(err),
    };
  }
}
