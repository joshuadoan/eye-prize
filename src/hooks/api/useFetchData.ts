import { useEffect, useReducer } from "react";
import appReducer from "./fetchDataReducer";
import { ActionType, State } from "../../types";
import { fetchData } from "./fetchData";

const ITEMS_PER_PAGE = 10;

const defaultAppState: State = {
  data: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: ITEMS_PER_PAGE,
  totalItems: 0,
  totalPages: 0,
};

export default function useAppState() {
  const [state, dispatch] = useReducer(appReducer, defaultAppState);

  useEffect(() => {
    const fetch = () => {
      fetchData(state.currentPage, ITEMS_PER_PAGE, state.searchTerm)
        .then((response) => {
          dispatch({
            type: ActionType.SetResponse,
            response,
          });
        })
        .catch((error) => {
          dispatch({
            type: ActionType.SetError,
            error,
          });
        })
        .finally(() => {
          dispatch({
            type: ActionType.SetLoading,
            isLoading: false,
          });
        });
    };

    dispatch({
      type: ActionType.SetLoading,
      isLoading: true,
    });
    fetch();
  }, [state.currentPage, state.searchTerm]);

  return {
    ...state,
    searchTerm: state.searchTerm,
    setSearchTerm: (searchTerm: string) =>
      dispatch({
        type: ActionType.SetSearchTerm,
        searchTerm,
      }),
    setCurrentPage: (currentPage: number) =>
      dispatch({
        type: ActionType.SetCurrentPage,
        currentPage,
      }),
  };
}
