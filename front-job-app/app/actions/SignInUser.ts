"use server";

import { JobInformationModel, userValueModel } from "@/types";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;
export async function SignInUser(userInfo: userValueModel) {
  // TODO: got user creation, and context for being signed in working
  // NEXT: fetch to authenticate user credentials. Stay signed in.
  // THEN: emailer for backend
  try {
    // user ValueModel
    // const res = await fetch(baseUrl + `/create-user`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(userInfo),
    // });

    // if (!res.ok) {
    //   throw new Error(`Failed to connect to API`);
    // }
    // const data = await res.json();
    // if (data.success) {
    return {
      success: true,
      message: "Meow.",
      userData: {
        user_id: "",
        user_token: "",
        user_role: "",
        token_expiration: "7d",
        validated: false,
      },
    };
    // } else {
    //   throw new Error(data.message);
    // }
  } catch (err: unknown) {
    return {
      success: false,
      message: `failed to create job: ` + err,
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
