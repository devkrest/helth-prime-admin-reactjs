export interface IDepartmentModel {
  id: number;
  name: string;
  short_name: string;
  user_id: string;
  dir_user_id: string;
  dir_user_name: string;
  status: number;
  status_label: string;
  user_name: string;
  created_at: Date;
  updated_at: Date;
  user:{id:number,name:string}[]
}
