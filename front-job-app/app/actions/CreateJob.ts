"use server";

import { JobInformationModel } from "@/types";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;
export async function CreateJob(job: JobInformationModel) {
  try {
    const res = await fetch(baseUrl + `/create-job`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(job),
    });
    // console.log(`create job response: `, res)

    if (!res.ok) {
      throw new Error(`Failed to connect to API`);
    }
    const data = await res.json();
    if (data.success) {
      return {
        success: true,
        message: "Successfully created job.",
      };
    } else {
      throw new Error(data.message);
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: `failed to create job: ` + err,
    };
  }
}
