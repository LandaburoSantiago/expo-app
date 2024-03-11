export interface Pagination {
  limit: number;
  offset: number;
}

export interface Page {
  itemsPage: number;
  hasMoreItems: boolean;
}
