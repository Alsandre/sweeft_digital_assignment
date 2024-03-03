import { API_KEY, IImageData, IResolve } from "./unsplashSearch";
const POP_IMG_PER_PAGE = 20;
export async function popularImages(): Promise<IResolve> {
  try {
    const res = await fetch(query());
    if (!res.ok) throw new Error("fetchData: invalid response");
    const data = await res.json();
    const imageList: IImageData[] =
      data?.results.map((val: any) => ({
        id: val.id,
        urls: val.urls,
        description: val.description,
        alt_description: val["alt_description"],
      })) || [];

    return { imageList, status: "ok", error: null };
  } catch (error: any) {
    return { imageList: [], status: "error", error: error.message };
  }
}

function query(): string {
  return `https://api.unsplash.com/photos/?per_page=${POP_IMG_PER_PAGE}&page=1&order_by=popular&client_id=${API_KEY}`;
}
