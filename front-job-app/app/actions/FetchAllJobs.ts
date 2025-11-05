"use server";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default async function FetchAllJobs(lastJobId: string) {
  try {
    const url = lastJobId
      ? `${baseUrl}/jobs?lastJobId=${lastJobId}`
      : `${baseUrl}/jobs`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Unable to fetch from API`);
    }
    const data = await res.json();
    return {
      success: true,
      message: "got all jobs",
      jobs: data.jobs,
      nextExpectedId: data.nextExpectedId,
    };
  } catch (err: any) {
    return {
      success: false,
      message: "failed to fetch jobs: ",
      err,
    };
  }
}
