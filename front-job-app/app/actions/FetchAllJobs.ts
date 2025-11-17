"use server";

import { JobInformationModel } from "@/types";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default async function FetchAllJobs(lastJobId: string) {
  try {
    console.log(`baseUrl: `, baseUrl)
    let jobsList : JobInformationModel[] = [];
    const url = lastJobId
      ? `${baseUrl}/jobs?lastJobId=${lastJobId}`
      : `${baseUrl}/jobs`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Unable to fetch from API`);
    }
    const data = await res.json();
    jobsList = data.jobs || [];
    return {
      success: true,
      message: "got all jobs",
      jobs: jobsList,
      nextExpectedId: data.nextExpectedId,
    };
  } catch (err: any) {
    return {
      success: false,
      message: "failed to fetch jobs: ",
      err,
      jobs: []
    };
  }
}
