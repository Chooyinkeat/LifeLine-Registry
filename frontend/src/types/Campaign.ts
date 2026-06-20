export interface Campaign {
  id: number;
  title: string;
  description: string;
  status: string;
  volunteers: number;
  location: string;
  urgency: string;
  createdBy: {
    id: number;
    name: string;
    role: string;
  };
  createdAt: string;
}

export interface CampaignStats {
  activeVolunteers: number;
  completedCampaigns: number;
  activeCampaigns: number;
  communitiesServed: number;
}

export interface CreateCampaignPayload {
  title: string;
  description: string;
  location: string;
  urgency: "High" | "Medium" | "Low";
}
