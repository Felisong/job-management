"use server";

import { JobInformationModel } from "@/types";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default async function FetchAllJobs(lastJobId: string, userId: string) {
  try {
    // last jobId and ser Id are needed here.
    if (userId === "") return {success: true, message: 'User has no account.', jobs: []};

    let jobsList : JobInformationModel[] = [];
    const url = lastJobId
      ? `${baseUrl}/jobs?lastJobId=${lastJobId}&userId=${userId}`
      : `${baseUrl}/jobs?userId=${userId}`;
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
      total: data.total
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: "failed to fetch jobs: ",
      err,
      jobs: []
    };
  }
}
