"use client";
import TextInputComponent from "@/app/components/TextInputComponent";
import { JobInformationModel } from "../../../types";

export default function EditPage({ job }: { job: JobInformationModel }) {
  return (
    <form action="POST">
      <TextInputComponent label="Company Name" />
      <TextInputComponent label="Job Title" />
      <TextInputComponent label="Job Description" />
      <TextInputComponent label="Other Notes" />
    </form>
  );
}
