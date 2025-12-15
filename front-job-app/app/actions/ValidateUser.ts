"use server";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default async function ValidateUser( paramId: string, token: string | null) {
  try {
    if (!paramId || !token) throw new Error("Missing data to submit.");

    const res = await fetch(baseUrl + `/users/validate/${paramId}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log(`response: `, res)
    if (!res.ok) {
      throw new Error(`Failed to connect to API`);
    }
    const data = await res.json();
    if (data.success) {
      return {
        success: true,
        message: "Verified user!"
      };
    } else {
      throw new Error(data.message);
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: `Failed to validate: ` + err,
    };
  }
}
