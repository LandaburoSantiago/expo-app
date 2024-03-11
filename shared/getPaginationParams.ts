import { Pagination } from "../interfaces/pagination";

export const getPaginationParams = (
  pageSize: number,
  currentPage = 1
): Pagination => {
  return {
    offset: pageSize * (currentPage - 1),
    limit: pageSize,
  };
};
