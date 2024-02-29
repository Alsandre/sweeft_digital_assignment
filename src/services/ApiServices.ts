import { EQueryType, TQuery } from "../types";

const CLIENT_ID = import.meta.env.REACT_APP_API_ACCESS_KEY;
const BASE_URL = "https://api.unsplash.com/";
const IMG_PER_REQUEST = 20;

export const generateSearchQuery = ({ query, page }: TQuery): string => {
  return `${BASE_URL}/search/photos/?query=${query}&page=${page}&per_page=${IMG_PER_REQUEST}&client_id=${CLIENT_ID}`;
};

export const generatePopImgsQuery = ({ page }: TQuery): string => {
  return `${BASE_URL}photos/?per_page=${IMG_PER_REQUEST}&page=${page}&order_by=popular&client_id=${CLIENT_ID}`;
};

export const generateStatisticsFromID = ({ id }: TQuery): string => {
  return `${BASE_URL}/photos/${id}/statistics/?client_id=${CLIENT_ID}`;
};

export const generateQuery = ({ query, page, id, type }: TQuery): string => {
  let url = "";
  switch (type) {
    case EQueryType.SEARCH:
      url = `${BASE_URL}/search/photos/?query=${query}&page=${page}&per_page=${IMG_PER_REQUEST}&client_id=${CLIENT_ID}`;
      break;
    case EQueryType.POPULAR_IMAGES:
      url = `${BASE_URL}photos/?per_page=${IMG_PER_REQUEST}&page=${page}&order_by=popular&client_id=${CLIENT_ID}`;
      break;
    case EQueryType.STATISTICS:
      url = `${BASE_URL}/photos/${id}/statistics/?client_id=${CLIENT_ID}`;
      break;
    default:
      url = `${BASE_URL}photos/?per_page=${IMG_PER_REQUEST}&page=${page}&order_by=popular&client_id=${CLIENT_ID}`;
  }

  return url;
};
