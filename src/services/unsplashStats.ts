import { API_KEY } from "./unsplashSearch";
export async function imageStats(id: string): Promise<TStats> {
  try {
    const res = await fetch(query(id));
    if (!res.ok) throw new Error("fetchData: invalid response");
    const data = await res.json();
    const downloads = data.downloads.total;
    const views = data.views.total;
    const likes = data.likes.total;

    return { downloads, likes, views };
  } catch (error: any) {
    return error.message;
  }
}

function query(id: string): string {
  return `https://api.unsplash.com//photos/${id}/statistics/?client_id=${API_KEY}`;
}

type TStats = {
  downloads: number;
  likes: number;
  views: number;
};
