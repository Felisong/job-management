"use server";

import { JobInformationModel } from "@/types";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default async function EditJob(job: JobInformationModel) {
  try {
    const res = await fetch(baseUrl + "/update-job", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(job),
    });
    if (!res.ok) {
      throw new Error("Unable to communicate with API");
    }
    const data = await res.json();
    if (data.success) {
      return { success: true, message: "i edit da job" };
    } else {
      throw new Error(data.message);
    }
  } catch (err: unknown) {
    return { success: false, message: "failed to edit the Job" };
  }
}
