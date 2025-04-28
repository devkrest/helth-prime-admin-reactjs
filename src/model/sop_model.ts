export interface ISopModel {
  id: number;
  title: string;
  sop_number: string;
  version_number: string;
  created_at: Date;
  updated_at: Date;
  status: number;
  status_label: string;
  supersedes: string;
  user_id: number;
  approve_by_user_id: number;
  review_date: Date;
  data: Data;
  approved_by_name?: string;
  prepared_by_name?: string;
  department_name?: string;
  revision: ISopRevision[];
}

export interface Data {
  scope: string;
  safety: string;
  purpose: string;
  quality: string;
  procedure: string[];
  references: string;
  attachments: string;
  responsibilities: string;
}

export interface ISopRevision {
  id: number;
  sop_id: number;
  reason: string;
  status: number;
  status_label: string;
  created_at: Date;
  updated_at: Date;
}
