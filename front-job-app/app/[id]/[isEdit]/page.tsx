"use client";

import { JobInformationModel } from "@/types";
import React, { useEffect, useState } from "react";
import EditPage from "./EditPage";
import ViewingPage from "./ViewingPage";
import FetchJob from "@/app/actions/FetchJob";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default function viewJob({
  params,
}: {
  params: Promise<{ id: string; isEdit: boolean }>;
}) {
  // this has the job id, and isEdit inside to flag whether user is editing or not.
  const parameters = React.use(params) || {};
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [updateJob, setUpdateJob] = useState(false);
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
      console.log(`i am fetching the job now!`);
      const res = await FetchJob(parameters.id);
      if (res.success) {
        setJob({ ...job, ...res.jobData });
      } else {
        throw new Error("Unable to fetch job data");
      }

      console.log(`res?: `, res);
    } catch (err: any) {
      setErrMessage(`Failed to get job information`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (parameters.id) {
      fetchJob();
    } else {
      console.log(`no id?: `, parameters.id);
    }
  }, [parameters.id]);
  // console.log("job: ", job);
  // mini component to return which component to display depending on if the user is editing or not.
  function JobInfoLayout() {
    if (parameters.isEdit) return <EditPage job={job} />;
    return <ViewingPage job={job} />;
  }

  // initial laoding page state
  if (loading && !job.company) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1>
        {parameters.isEdit ? `Editing ` : "Viewing "} {job.company} Opportunity
      </h1>
      <JobInfoLayout />
    </div>
  );
}
