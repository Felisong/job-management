"use server";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export async function ChangeUserPasswordEmail(userId: string, email: string, token: string | null) {
  try {
    console.log(`i get to the action: `, userId, email, token)
    const res = await fetch(baseUrl + `/users/change-pw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, email }),
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
      message: `Failed to Change Password: ` + err,
    };
  }
}