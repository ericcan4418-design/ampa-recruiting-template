export type Vertical = "Pest Control" | "Solar" | "Insurance" | "Not Sure Yet";

export interface Lead {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  state: string;
  vertical: Vertical;
  has_experience: boolean;
  created_at?: string;
}

export interface SignedRep {
  id?: string;
  name: string;
  vertical: Vertical | string;
  region: string;
  start_date: string;
  phone: string;
  email: string;
  created_at?: string;
}

export interface SubmitLeadPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  state: string;
  vertical: Vertical;
  hasExperience: boolean;
  canTravel: boolean;
  isCommissionOk: boolean;
  needsHealthInsurance: boolean;
}

export interface GHLWebhookPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  tags: string[];
  customFields: { state: string; has_experience: boolean };
}

export interface SignedRepWebhookPayload {
  name: string;
  vertical: string;
  region: string;
  start_date: string;
  phone: string;
  email: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  data?: T;
  error?: string;
}
