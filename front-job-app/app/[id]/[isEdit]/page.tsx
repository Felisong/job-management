"use client";

import { JobInformationModel } from "@/types";
import React, { useEffect, useState } from "react";
import EditPage from "./EditPage";
import ViewingPage from "./ViewingPage";
import FetchJob from "@/app/actions/FetchJob";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/utils/Spinner";
import { DeleteJob } from "@/app/actions/DeleteJob";
import { useToast } from "@/app/utils/context/ShowToastContext";

export default function ViewJob({
  params,
}: {
  params: Promise<{ id: string; isEdit: string }>;
}) {
  const toast = useToast();
  const route = useRouter();
  // this has the job id, and isEdit inside to flag whether user is editing or not.
  const parameters = React.use(params) || {};
  const [loading, setLoading] = useState<boolean>(true);
  const [redirectClicked, setRedirectClicked] = useState<boolean>(false);
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
    } catch (err: unknown) {
      toast.triggerToast({message: 'Error: ' + err, isError: true, showToast: true})
    } finally {
      setLoading(false);
    }
  }

  // delete a job
  async function handleDeleteClick(jobId: string) {
    const req = await DeleteJob(jobId);
    if (req.success) {
      toast.triggerToast({message: 'Successfully deleted job', isError: false, showToast: true})
      setTimeout(() => {
        route.push("/");
      }, 1500);
    } else {
     toast.triggerToast({message: 'Error: ' + req.message, isError: true, showToast: true})
    }
  }

  // refetch after the update is sent
  async function updateJobData() {
    fetchJob();
    route.push(`/${job._id}/false`);
  }

  useEffect(() => {
    if (parameters.id) {
      fetchJob();
    } else {
      toast.triggerToast({message: 'Failed to get job, will direct home.', isError: true, showToast: true});
      setTimeout(() => {
        route.push("/");
      })
    }
  }, [parameters.id]);

  // mini component to return which component to display depending on if the user is editing or not.
  function JobInfoLayout() {
    if (parameters.isEdit === "true")
      return <EditPage updateJobData={updateJobData} job={job} />;
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
      {redirectClicked ? (
        <Spinner />
      ) : (
        <button
          className=" text-white self-start"
          onClick={() => {
            setRedirectClicked(true);
            const newValue = parameters.isEdit === "true" ? false : true;
            route.push(`/${parameters.id}/${newValue}`);
          }}
        >
          {parameters.isEdit === "true"
            ? "Click here to View Only"
            : "Click here to Edit"}
        </button>
      )}
      <JobInfoLayout />
      <button
        className="py-4"
        onClick={(e) => {
          e.preventDefault();
          handleDeleteClick(job._id);
        }}
      >
        Delete This Job
      </button>
    </div>
  );
}
