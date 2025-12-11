"use server";

import { JobInformationModel, userValueModel } from "@/types";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;
export async function SignInUser(userInfo: userValueModel) {
  try {
    const res = await fetch(baseUrl + `/user/sign-in`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!res.ok) {
      throw new Error(`Failed to connect to API`);
    }
    const data = await res.json();
    if (data.success) {
    return {
      success: true,
      message: "User successfully signed in.",
      userData: {
        user_id: data.userData.user_id,
        user_token: data.userData.user_token,
        user_role: data.userData.user_role,
        token_expiration: data.userData.token_expiration,
        validated: data.userData.validated,
      },
    };
    } else {
      throw new Error(data.message);
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: `Failed to sign in: ` + err,
      userData: {
        user_id: "",
        user_token: "",
        user_role: "",
        token_expiration: "",
        validated: false,
      },
    };
  }
}
