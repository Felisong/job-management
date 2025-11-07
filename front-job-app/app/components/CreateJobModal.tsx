"use client";

import { JobInformationModel } from "@/types";
import { useState } from "react";
import TextInputComponent from "./TextInputComponent";
import DropDownInput from "./DropDownInput";
import TextAreaComponent from "./TextAreaComponent";
import DateInputComponent from "./DateInputComponent";
import { useModal } from "../utils/context/AddModalContext";

export default function CreateJobModal() {
  const { isOpen, closeModal } = useModal();

  const [jobInfo, setJobInfo] = useState<JobInformationModel>({
    _id: "",
    company: "",
    job_title: "",
    date_sent: "",
    state: "awaiting_response",
    job_description: "",
    other: "",
  });
  // text state management
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

  if (!isOpen) return null;
  return (
    <div className="glassmorphism fixed inset-0 flex justify-center flex-col w-full items-center">
      <div className="w-5/6 bg-backdrop-primary rounded p-4">
        <div className="flex justify-between items-center">
          <h2>Create New Entry</h2>
          <button onClick={closeModal} className="text-2xl">
            X
          </button>
        </div>
        <form action="POST" className="box-border h-fit flex flex-col">
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
          <DropDownInput
            value={jobInfo.state}
            onChange={handleTextChange("state")}
          />
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

              //handle add new Job
            }}
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}
