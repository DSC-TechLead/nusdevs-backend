type Timestampable = {
  created_at: string;
  updated_at: string;
};

export interface ProjectData extends Timestampable {
  id: string;
  company_id: string;
  identity_id: string;
}

export interface UserData extends Timestampable {
  id: string;
  email?: string;
  phone_number?: string;
  email_verified?: boolean;
  phone_number_verified?: boolean;
  name?: string;
}

export interface EventData extends Timestampable {
  event_id: string;
  event_name: string;
  event_date: string;
}
