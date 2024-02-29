const CLIENT_ID = import.meta.env.REACT_APP_API_ACCESS_KEY;
const BASE_URL = "https://api.unsplash.com/";
const IMG_PER_REQUEST = 20;

export const generateSearchQuery = ({
  query,
  page,
}: {
  query: string;
  page: number;
}): string => {
  return `${BASE_URL}/search/photos/?query=${query}&page=${page}&per_page=${IMG_PER_REQUEST}&client_id=${CLIENT_ID}`;
};
export const generateStatisticsFromID = (id: string): string => {
  return `${BASE_URL}/photos/${id}/statistics/?client_id=${CLIENT_ID}`;
};
export const generatePopImgsQuery = (): string => {
  return `${BASE_URL}photos/?per_page=${IMG_PER_REQUEST}&order_by=popular&client_id=${CLIENT_ID}`;
};
