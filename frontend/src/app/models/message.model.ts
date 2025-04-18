export interface Message {
  _id?: string;
  to: string;
  from?: string;
  body: string;
  sent_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
