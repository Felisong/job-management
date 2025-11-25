"use client";

import { JobInformationModel } from "@/types";
import { useEffect, useState } from "react";
import TextInputComponent from "./TextInputComponent";
import DropDownInput from "./DropDownInput";
import TextAreaComponent from "./TextAreaComponent";
import DateInputComponent from "./DateInputComponent";
import { useModal } from "../utils/context/AddModalContext";
import { isFieldEmpty, isRealDate } from "../utils/validation";
import { CreateJob } from "../actions/CreateJob";
import { useToast } from "../utils/context/ShowToastContext";
import { useRouter } from "next/navigation";

export default function CreateJobModal() {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, closeModal } = useModal();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}T00:00:00.000Z`;

  const [jobInfo, setJobInfo] = useState<JobInformationModel>({
    _id: "",
    company: "",
    job_title: "",
    date_sent: today || '',
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
  // sends the fetch and handles the results of that fetch
  async function handleCreateJob() {
    try {
      const result = await CreateJob(jobInfo);
      if (result.success) {
        toast.triggerToast({
          message: result.message,
          isError: false,
          showToast: true,
        });
        setJobInfo({
          _id: "",
          company: "",
          job_title: "",
          date_sent: today,
          state: "awaiting_response",
          job_description: "",
          other: "",
        });
        closeModal();

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        throw new Error(result.message);
      }
    } catch (err: unknown) {
      if (String(err).startsWith("Failed to fetch")) {
        toast.triggerToast({
          message: `Failed to communicate with API, please reach out to carolinahs100@gmail.com`,
          isError: false,
          showToast: true,
        });
      } else {
        toast.triggerToast({
          message: `Failed to create new job. Please try again later.`,
          isError: true,
          showToast: true,
        });
      }
    }
  }

  // resets value when modal closes
  useEffect(() => {
    if (!isOpen) {
      setJobInfo({
        _id: "",
        company: "",
        job_title: "",
        date_sent: today,
        state: "awaiting_response",
        job_description: "",
        other: "",
      });
    }
  }, [isOpen]);

  // checks that the form is valid before allowing submission
  useEffect(() => {
    !isFieldEmpty(jobInfo.company, "company name") &&
    !isFieldEmpty(jobInfo.job_title, "job title") &&
    !isFieldEmpty(String(jobInfo.state), "job state") &&
    !isFieldEmpty(String(jobInfo.job_description), "job description") &&
    !isRealDate(String(jobInfo.date_sent))
      ? setFormIsValid(true)
      : setFormIsValid(false);
  }, [jobInfo]);


  if (!isOpen) return null;
  return (
    <div className="glassmorphism fixed inset-0 flex justify-center flex-col w-full items-center ">
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
            validation={isFieldEmpty(jobInfo.company, "company name")}
          />
          <TextInputComponent
            label="Job Title"
            value={jobInfo.job_title}
            onChange={handleTextChange("job_title")}
            validation={isFieldEmpty(jobInfo.job_title, "job title")}
          />
          <DropDownInput
            value={jobInfo.state}
            onChange={handleTextChange("state")}
            validation={isFieldEmpty(String(jobInfo.state), "job state")}
          />
          <TextAreaComponent
            label="Job Description"
            value={jobInfo.job_description ? jobInfo.job_description : ""}
            onChange={handleTextChange("job_description")}
            validation={isFieldEmpty(
              String(jobInfo.job_description),
              "job description"
            )}
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
            validation={isRealDate(String(jobInfo.date_sent))}
          />
          <button
            className="text-xl text-white py-4 self-start mt-8 disabled:text-gray-400 disabled:cursor-not-allowed "
            disabled={!formIsValid}
            onClick={(e) => {
              e.preventDefault();
              handleCreateJob();
            }}
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}
