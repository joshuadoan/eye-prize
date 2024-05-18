import { Action, ActionType, State } from "../../types";

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.Fetch: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionType.SetResponse: {
      return {
        ...state,
        ...action.response,
      };
    }
    case ActionType.SetError: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ActionType.SetLoading: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case ActionType.SetCurrentPage: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case ActionType.SetSearchTerm: {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }
    default: {
      return state;
    }
  }
}
export default appReducer;
