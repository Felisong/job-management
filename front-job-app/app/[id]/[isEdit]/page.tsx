"use client";

import { JobInformationModel } from "@/types";
import React, { useEffect, useState } from "react";
import EditPage from "./EditPage";
import ViewingPage from "./ViewingPage";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default function viewJob({
  params,
}: {
  params: Promise<{ id: string; isEditing: boolean }>;
}) {
  // this has the job id, and isEdit inside to flag whether user is editing or not.
  const parameters = React.use(params);
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [updatedInfo, setUpdatedInfo] = useState(false);
  const [job, setJob] = useState<JobInformationModel>({
    _id: "",
    company: "",
    job_title: "",
    date_sent: null,
    state: "",
    job_description: "",
    other: "",
  });

  async function fetchJob() {
    try {
      setLoading(true);
      console.log(`i am doing the fetch`);
      const res = await fetch(baseUrl + `/job-info/${parameters.id}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Unable to communicate with API");
      }
      const data = await res.json();
      console.log(`am i receiving the data?: `, data);
    } catch (err: any) {
      setErrMessage(`unable to fetch job data: ` + err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(`should fetch on load?`);
    fetchJob();
  }, []);

  if (parameters.isEditing) return <EditPage job={job} />;
  return <ViewingPage job={job} />;
}
