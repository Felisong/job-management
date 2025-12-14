"use server";

import { JobInformationModel, userDataModel, userValueModel } from "@/types";

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
    const object : userDataModel & {
            user_token: string;
            token_expiration: string;
          } = {
      user_id: data.userData.user_id,
      user_token: data.userData.user_token,
      user_role: data.userData.user_role,
      token_expiration: data.userData.token_expiration,
      validated: data.userData.validated,
      user_email: data.userData.user_email,
    };
    if (data.success) {
      return {
        success: true,
        message: "User successfully signed in.",
        userData: object,
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
        user_email: ""
      },
    };
  }
}
