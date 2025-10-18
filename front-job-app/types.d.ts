export interface JobInformationModel {
  _id: string;
  company: string;
  job_title: string;
  date_sent: Date | null;
  state: string;
  job_description?: string;
  other?: string;
}
