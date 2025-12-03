"use client";

import { JobInformationModel } from "@/types";
import { DeleteJob } from "../actions/DeleteJob";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../utils/context/ShowToastContext";

export default function JobDisplayList({
  jobs,
}: {
  jobs: JobInformationModel[];
}) {
  const toast = useToast();
  const router = useRouter();
  // handles the array inside the component for ease of use
  const [displayedJobs, setDisplayedJobs] =
    useState<JobInformationModel[]>(jobs);

  // redirect the user for view or edit page.
  function handleRedirect(jobId: string, isEditing: boolean = false) {
    router.push(`/${jobId}/${isEditing}`);
  }

  // delete a job
  async function handleDeleteClick(jobId: string) {
    const req = await DeleteJob(jobId);
    if (req.success) {
      const cleanedArr = displayedJobs.filter((j) => j._id !== jobId);
      setDisplayedJobs(cleanedArr);
    } else {
      toast.triggerToast({
        message: "Failed to delete job, please try again later",
        isError: true,
        showToast: true,
      });
    }
  }

  // keeps the array updated as jobs loads in more.
  useEffect(() => {
    setDisplayedJobs(jobs);
  }, [jobs]);

  return (
    <ul className="p-2 box-border">
      {displayedJobs.map((job: JobInformationModel, i) => {
        const date = new Date(job.date_sent ? job.date_sent : "");
        const currentMonth = date.getMonth();
        const prevMonth = i > 0 ? new Date(displayedJobs[i - 1].date_sent!).getMonth() : null;
        const nextMonth = i < displayedJobs.length - 1 ? new Date(displayedJobs[i + 1].date_sent!).getMonth() : null;
        const isLastItem = i === displayedJobs.length - 1 ||  currentMonth !== nextMonth;
        const showMonth = i === 0 || currentMonth !== prevMonth;
        return (
          <div key={job._id}>
            {showMonth && (
              <li className="text-2xl front-bold my-4">
                {date.toLocaleString('en-US', {month: 'long'})}
              </li>
            )}
            <li className={`px-4 relative bg-secondary-backdrop ${showMonth && 'rounded-t-xl'} ${isLastItem && 'rounded-b-xl'}`}>
              <div
                className={`w-8 h-8 rounded absolute right-0 top-0 text-backdrop-primary ${
                  job.state === "awaiting_response"
                    ? "bg-amber-300 "
                    : job.state === "rejected"
                    ? "bg-red-400"
                    : "bg-green-300"
                }`}
              >
                <p className="flex w-full h-full justify-center items-center text-2xl">
                  {job.state === "awaiting_response"
                    ? "?"
                    : job.state === "rejected"
                    ? "X"
                    : "O"}
                </p>
              </div>
              <h2 className="text-3xl">
                {job.company.length > 25
                  ? job.company.slice(0, 25) + "..."
                  : job.company}
              </h2>
              <p className="text-secondary-text text-xl">{job.job_title}</p>
              <div className="flex justify-between p-4 text-xl items-end">
                <button
                  onClick={() => {
                    handleRedirect(job._id, true);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDeleteClick(job._id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleRedirect(job._id, false);
                  }}
                >
                  View
                </button>
              </div>
              {(showMonth && !isLastItem) || !isLastItem ? <hr></hr> : null}
            </li>
          </div>
        );
      })}
    </ul>
  );
}
