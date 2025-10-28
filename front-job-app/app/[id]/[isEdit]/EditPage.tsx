"use client";
import TextInputComponent from "@/app/components/TextInputComponent";
import { JobInformationModel } from "../../../types";
import TextAreaComponent from "@/app/components/TextAreaComponent";
import DateInputComponent from "@/app/components/DateInputComponent";

export default function EditPage({ job }: { job: JobInformationModel }) {
  return (
    <form action="POST">
      <TextInputComponent label="Company Name" value={job.company} />
      <TextInputComponent label="Job Title" value={job.job_title} />
      <TextAreaComponent
        label="Job Description"
        value={job.job_description ? job.job_description : ""}
      />
      <DateInputComponent
        label="Application Date"
        value={job.date_sent ? job.date_sent : new Date()}
      />
    </form>
  );
}
