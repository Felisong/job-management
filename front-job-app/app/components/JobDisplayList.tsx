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
      {jobs.map((job: JobInformationModel) => (
        <li key={job._id} className="my-4">
          <h2 className="text-2xl">{job.company}</h2>
          <p>{job.job_title}</p>
        </li>
      ))}
    </ul>
  );
}
