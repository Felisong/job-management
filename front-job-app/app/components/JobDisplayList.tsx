"use client";

import { JobInformationModel } from "@/types";
import { useEffect, useState } from "react";

export default function JobDisplayList({
  jobs,
}: {
  jobs: JobInformationModel[];
}) {
  return (
    <ul className="p-2 box-border">
      {jobs.map((job: JobInformationModel, i) => (
        <li key={job._id} className="my-4">
          <h2 className="text-3xl">{job.company}</h2>
          <p className="text-secondary-text text-xl">{job.job_title}</p>
          <div className="flex justify-between p-4 text-xl items-end">
            <button className="">Edit</button>
            <button className="">Delete</button>
            <button>
              <div className="h-20 w-20 rounded-xl bg-amber-300"></div>
            </button>
          </div>
          {i !== jobs.length - 1 && <hr></hr>}
        </li>
      ))}
    </ul>
  );
}
