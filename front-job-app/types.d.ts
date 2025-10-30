export interface JobInformationModel {
  _id: string;
  company: string;
  job_title: string;
  date_sent: string | null;
  state: string;
  job_description?: string;
  other?: string;
}
