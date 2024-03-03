export async function fetchData(
    term: string,
    page: number,
    signal?: AbortSignal | null | undefined
  ): Promise<IResolve> {
    try {
      const res = await fetch(query(term, page), { signal });
      if (!res.ok) throw new Error("fetchData 10:invalid response");
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
  
  export interface IImageData {
    id: string;
    urls: { [key: string]: string };
    alt_description: string;
    description: string;
  }
  interface IResolve {
    imageList: IImageData[];
    status: string;
    error: string | null;
  }
  
  const query = (term: string, page: number): string => {
    return `https://api.unsplash.com//search/photos/?query=${term}&page=${page}&per_page=20&client_id=${API_KEY}`;
  };
  const API_KEY = "1vj7FtHGjWiqRZK9nb8jeFISPUiUMiQgf4M-YsPXoLg";
  