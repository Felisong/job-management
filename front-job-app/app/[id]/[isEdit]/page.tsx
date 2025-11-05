"use client";

import { JobInformationModel } from "@/types";
import React, { useEffect, useState } from "react";
import EditPage from "./EditPage";
import ViewingPage from "./ViewingPage";
import FetchJob from "@/app/actions/FetchJob";
import { useRouter } from "next/navigation";

export default function viewJob({
  params,
}: {
  params: Promise<{ id: string; isEdit: string }>;
}) {
  // this has the job id, and isEdit inside to flag whether user is editing or not.
  const router = useRouter();
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
      const res = await FetchJob(parameters.id);
      if (res.success) {
        setJob({ ...job, ...res.jobData });
      } else {
        throw new Error("Unable to fetch job data");
      }
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
  console.log(`is Edit? `, parameters.isEdit);

  // mini component to return which component to display depending on if the user is editing or not.
  function JobInfoLayout() {
    if (parameters.isEdit === "true") return <EditPage job={job} />;
    return <ViewingPage job={job} />;
  }

  // initial laoding page state
  if (loading && !job.company) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 h-fit py-4">
      <h1>
        {parameters.isEdit === "true" ? `Editing ` : "Viewing "} {job.company}{" "}
        Opportunity
      </h1>
      <button
        className=" text-white self-start"
        onClick={() => {
          const newValue = parameters.isEdit === "true" ? false : true;
          router.push(`/${parameters.id}/${newValue}`);
        }}
      >
        {parameters.isEdit === "true"
          ? "Click here to View Only"
          : "Click here to Edit"}
      </button>
      <JobInfoLayout />
    </div>
  );
}
