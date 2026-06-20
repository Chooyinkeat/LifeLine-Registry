import api from "./api";
import type {
  Campaign,
  CampaignStats,
  CreateCampaignPayload,
} from "@/types/Campaign";

export async function fetchCampaigns(status?: string): Promise<Campaign[]> {
  const params = status ? { status } : {};
  const { data } = await api.get<Campaign[]>("/campaigns", { params });
  return data;
}

export async function fetchCampaign(id: number): Promise<Campaign> {
  const { data } = await api.get<Campaign>(`/campaigns/${id}`);
  return data;
}

export async function fetchCampaignStats(): Promise<CampaignStats> {
  const { data } = await api.get<CampaignStats>("/campaigns/stats");
  return data;
}

export async function createCampaign(
  payload: CreateCampaignPayload,
): Promise<Campaign> {
  const { data } = await api.post<Campaign>("/campaigns", payload);
  return data;
}

export async function joinCampaign(id: number): Promise<Campaign> {
  const { data } = await api.post<Campaign>(`/campaigns/${id}/join`);
  return data;
}

export async function deleteCampaign(id: number): Promise<void> {
  await api.delete(`/campaigns/${id}`);
}
