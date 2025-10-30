"use client";
import TextInputComponent from "@/app/components/TextInputComponent";
import { JobInformationModel } from "../../../types";
import TextAreaComponent from "@/app/components/TextAreaComponent";
import DateInputComponent from "@/app/components/DateInputComponent";
import { useState } from "react";

export default function EditPage({ job }: { job: JobInformationModel }) {
  const [jobInfo, setJobInfo] = useState(job);
  function handleTextChange(field: keyof JobInformationModel) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setJobInfo((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  }

  return (
    <form action="POST">
      <TextInputComponent
        label="Company Name"
        value={jobInfo.company}
        onChange={handleTextChange("company")}
      />
      <TextInputComponent
        label="Job Title"
        value={jobInfo.job_title}
        onChange={handleTextChange("job_title")}
      />
      <TextAreaComponent
        label="Job Description"
        value={jobInfo.job_description ? jobInfo.job_description : ""}
        onChange={handleTextChange("job_description")}
      />
      <DateInputComponent
        label="Application Date"
        value={jobInfo.date_sent ? jobInfo.date_sent : ""}
        onChange={handleTextChange("date_sent")}
      />
    </form>
  );
}
