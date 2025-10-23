"use client";

import { JobInformationModel } from "@/types";
import { DeleteJob } from "../actions/DeleteJob";
import { useEffect, useState } from "react";

export default function JobDisplayList({
  jobs,
}: {
  jobs: JobInformationModel[];
}) {
  const [displayedJobs, setDisplayedJobs] = useState(jobs);

  async function handleDeleteClick(jobId: string) {
    const req = await DeleteJob(jobId);
    console.log(`requesting to delete job, here is the return: `, req);
    if (req.success) {
      const cleanedArr = displayedJobs.filter((j) => j._id !== jobId);
      setDisplayedJobs(cleanedArr);
    } else {
      //show toast
      console.log(`failed to delete`);
    }
  }

  useEffect(() => {
    setDisplayedJobs(jobs);
  }, [jobs]);
  return (
    <ul className="p-2 box-border">
      {displayedJobs.map((job: JobInformationModel, i) => (
        <li key={job._id} className="my-4 relative">
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
            {job.company.length > 18
              ? job.company.slice(0, 18) + "..."
              : job.company}
          </h2>
          <p className="text-secondary-text text-xl">{job.job_title}</p>
          <div className="flex justify-between p-4 text-xl items-end">
            <button>Edit</button>
            <button
              onClick={() => {
                handleDeleteClick(job._id);
              }}
            >
              Delete
            </button>
            <button>View</button>
          </div>
          {i !== jobs.length - 1 && <hr></hr>}
        </li>
      ))}
    </ul>
  );
}
