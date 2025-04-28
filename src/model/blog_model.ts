export interface IBlogModel {
  id: number;
  title: string;
  description: string;
  html: string;
  cover_photo: string;
  slug: string;
  status: number;
  status_label: string;
  category: string;
  alt: string;
  create_by: number;
  keyword: {
    id: string;
    text: string;
  }[];
  created_at: Date;
  updated_at: Date;
  display_date:Date
}
