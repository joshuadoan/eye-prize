export type DataResponse = {};

export type Data = {
  id: number;
  name: string;
  description: string;
};

export type State = {
  currentPage: number;
  data: Data[];
  isLoading: boolean;
  error: Error | null;
  itemsPerPage: number;
  searchTerm?: string;
  totalItems: number;
  totalPages: number;
};

export enum ActionType {
  Fetch = "Fetch",
  SetResponse = "SetResponse",
  SetError = "SetError",
  SetLoading = "SetLoading",
  SetCurrentPage = "SetCurrentPage",
  SetSearchTerm = "SetSearchTerm",
}

export type FetchAction = {
  type: ActionType.Fetch;
};

export type SetResponseAction = {
  type: ActionType.SetResponse;
  response: DataResponse;
};

export type SetErrorAction = {
  type: ActionType.SetError;
  error: Error;
};

export type SetLoadingAction = {
  type: ActionType.SetLoading;
  isLoading: boolean;
};

export type SetCurrentPageAction = {
  type: ActionType.SetCurrentPage;
  currentPage: number;
};

export type SetSearchTermAction = {
  type: ActionType.SetSearchTerm;
  searchTerm: string;
};

export type Action =
  | FetchAction
  | SetResponseAction
  | SetErrorAction
  | SetLoadingAction
  | SetCurrentPageAction
  | SetSearchTermAction;
