export interface JobInformationModel {
  _id: string;
  company: string;
  job_title: string;
  date_sent: string | null;
  state: string;
  job_description?: string;
  other?: string;
}

export interface userValueModel {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}
// user data model for the context
export interface userDataModel {
  user_id: string;
  user_token: string;
  user_role: string;
}
// export interface resumeDataModel {
//   first_name: string;
//   last_name: string;
//   email: string;
//   address: string;
//   address2: string;
//   city: string;
//   province: string;
//   country: string;
// }
// export interface resumeModel {

// }