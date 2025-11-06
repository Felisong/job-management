"use client";

import { JobInformationModel } from "@/types";

export default function ViewingPage({ job }: { job: JobInformationModel }) {
  function attributeExists(field: keyof JobInformationModel) {
    return job[field] !== "";
  }
  return (
    <div className="box-border mt-2 mb-10">
      <h2>Job Title</h2>
      <p>{job.job_title}</p>
      {attributeExists("state") && (
        <>
          <h2>Job Status</h2>
          <p>{job.state}</p>
        </>
      )}
      {attributeExists("date_sent") && (
        <>
          <h2>Application Date Sent</h2>
          <p>{job.date_sent?.substring(0, job.date_sent?.indexOf("T"))}</p>
        </>
      )}
      {attributeExists("other") && (
        <>
          <h2>Job Notes</h2>
          <p className="whitespace-pre-wrap">{job.other}</p>
        </>
      )}
      {attributeExists("job_description") && (
        <>
          <h2>Job Description</h2>
          <p className="whitespace-pre-wrap">{job.job_description}</p>
        </>
      )}
    </div>
  );
}
