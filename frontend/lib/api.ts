const API_BASE_URL = "/api";

export interface Conference {
  id: number;
  name: string;
  year: number;
  start_date: string;
  end_date: string;
  venue: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Hall {
  id: number;
  name: string;
  slug: string | null;
  conference: number;
  embed_url: string;
}

export interface ScheduleItem {
  id: number;
  topic: string;
  description: string;
  type: "talk" | "workshop" | "panel" | "break" | "registration" | "networking";
  conference: number;
  hall: number;
  conference_name: string;
  conference_year: number;
  hall_name: string;
  hall_slug: string | null;
  start_datetime: string;
  end_datetime: string;
  speaker: string;
  speaker_bio: string;
  speaker_image: string;
  youtube_id: string;
  video_thumbnail: string;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  }

  async getConferences(): Promise<Conference[]> {
    const response = await this.request<PaginatedResponse<Conference>>(
      "/conferences"
    );
    return response.results; // Extract the results array from pagination
  }

  async getConference(id: number): Promise<Conference> {
    return this.request<Conference>(`/conferences?id=${id}`);
  }

  async getHalls(conferenceId?: number): Promise<Hall[]> {
    const endpoint = conferenceId
      ? `/halls?conference=${conferenceId}`
      : "/halls";
    const response = await this.request<PaginatedResponse<Hall>>(endpoint);
    return response.results;
  }

  async getHall(id: number): Promise<Hall> {
    return this.request<Hall>(`/halls?id=${id}`);
  }

  async getSessions(filters?: {
    conference?: number;
    hall?: number;
    type?: string;
    is_archived?: boolean;
    page?: number;
    all?: boolean;
  }): Promise<PaginatedResponse<ScheduleItem>> {
    const params = new URLSearchParams();
    if (filters?.conference)
      params.append("conference", filters.conference.toString());
    if (filters?.hall) params.append("hall", filters.hall.toString());
    if (filters?.type) params.append("type", filters.type);
    if (filters?.is_archived !== undefined)
      params.append("is_archived", filters.is_archived.toString());
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.all) params.append("all", "true");

    const endpoint = `/sessions${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    return await this.request<PaginatedResponse<ScheduleItem>>(endpoint);
  }

  async getSession(id: number): Promise<ScheduleItem> {
    return this.request<ScheduleItem>(`/sessions?id=${id}`);
  }

  async getArchivedSessions(page?: number): Promise<ScheduleItem[]> {
    try {
      const sessions = await this.getSessions({ is_archived: true, all: true });

      // if (!Array.isArray(sessions)) {
      //   console.error("API: Sessions is not an array:", sessions);
      //   return [];
      // }

      return sessions as unknown as ScheduleItem[];
    } catch (error) {
      console.error("API: Error fetching archived sessions:", error);
      return [];
    }
  }

  async getCurrentConference(): Promise<{
    conference: Conference;
    halls: Hall[];
    sessions: PaginatedResponse<ScheduleItem>;
  }> {
    try {
      const conferences = await this.getConferences();
      const currentConference =
        conferences.find((c) => c.year === new Date().getFullYear()) ||
        conferences[0]; // Fallback to first conference

      if (!currentConference) {
        throw new Error("No conferences found");
      }

      const [halls, sessions] = await Promise.all([
        this.getHalls(currentConference.id),
        this.getSessions({ conference: currentConference.id, all: true }),
      ]);

      return {
        conference: currentConference,
        halls,
        sessions,
      };
    } catch (error) {
      console.error("API: Error fetching current conference:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
