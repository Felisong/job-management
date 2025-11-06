"use client";
import TextInputComponent from "@/app/components/TextInputComponent";
import { JobInformationModel } from "../../../types";
import TextAreaComponent from "@/app/components/TextAreaComponent";
import DateInputComponent from "@/app/components/DateInputComponent";
import { useState } from "react";
import DropDownInput from "@/app/components/DropDownInput";
import EditJob from "@/app/actions/EditJob";

export default function EditPage({
  job,
  updateJobData,
}: {
  job: JobInformationModel;
  updateJobData: () => void;
}) {
  const [jobInfo, setJobInfo] = useState(job);
  function handleTextChange(field: keyof JobInformationModel) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setJobInfo((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  }

  async function handleUpdateJobInfo() {
    try {
      const updateJob = await EditJob(jobInfo);
      if (updateJob.success) {
        updateJobData();
      } else {
        throw new Error(updateJob.message);
      }
    } catch (err: any) {
      console.log(`handle edit err: `, err);
    }
  }

  return (
    <form action="POST" className="box-border h-fit py-8 mb-20 flex flex-col">
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
      <DropDownInput onChange={handleTextChange("state")} />
      <TextAreaComponent
        label="Job Description"
        value={jobInfo.job_description ? jobInfo.job_description : ""}
        onChange={handleTextChange("job_description")}
      />
      <TextAreaComponent
        label="Other Information"
        value={jobInfo.other ? jobInfo.other : ""}
        onChange={handleTextChange("other")}
      />
      <DateInputComponent
        label="Application Date"
        value={jobInfo.date_sent ? jobInfo.date_sent : ""}
        onChange={handleTextChange("date_sent")}
      />
      <button
        className="text-xl text-white py-4 self-start mt-8"
        onClick={(e) => {
          e.preventDefault();
          handleUpdateJobInfo();
        }}
      >
        Update
      </button>
    </form>
  );
}
