"use server";

import { JobInformationModel, userValueModel } from "@/types";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;
export async function SignInUser(userInfo: userValueModel) {
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
        validated: ''
      };
    // } else {
    //   throw new Error(data.message);
    // }
  } catch (err: unknown) {
    return {
      success: false,
      message: `failed to create job: ` + err,
    };
  }
}
