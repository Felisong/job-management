"use server";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;
export async function deleteJob(jobId: string) {
  try {
    const res = await fetch(baseUrl + `delete-job/${jobId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Failed to connect to API`);
    }
    const data = await res.json();

    if (data.success) {
      return {
        success: true,
        message: "deleted job",
      };
    } else {
      throw new Error(data.message);
    }
  } catch (err: any) {
    return {
      success: false,
      message: `failed to delete job: ` + err,
    };
  }
}
