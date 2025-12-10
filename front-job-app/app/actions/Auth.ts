"use server";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export async function FetchUserData(token: string) {
  try {
    const response = await fetch(baseUrl + "/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    if (!response.ok) throw new Error("Failed to fetch user data.");
    return await response.json();
  } catch (err: unknown) {
    console.error(`Error in auth: `, err)
    return {message: `Error: `, err}
  }
}
