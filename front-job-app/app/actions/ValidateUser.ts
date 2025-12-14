"use server";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export async function ValidateUser(userId : string) {
  try {
    console.log(`front: ${userId}`);
    const res = await fetch(baseUrl + `/validate/${userId}`, {
      method: "PUT",
    });
    if (!res.ok) {
      throw new Error(`Failed to connect to API`);
    }
    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: `Failed to validate: ` + err
    };
  }
}
