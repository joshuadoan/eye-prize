import "simpledotcss/simple.min.css"
import { useEffect, useReducer } from "react"

export const CAT_FACT_URL = "https://cat-fact.herokuapp.com/facts";

export type Fact = {
  _id: string;
  text: string;
  updatedAt: string; // Datetime
};

type GenericError = {
  statusText: string;
  status?: number;
};

enum ActionTypes {
  SET_DATA = "SET_DATA",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

type AppState = {
  selectedFact: Fact | null,
  data: Fact[] | null;
  isLoading: boolean;
  error: GenericError | null;
}

type SetDataAction = {
  type: ActionTypes.SET_DATA
  payload: Fact[] | null,
}

type SetLoadingAction = {
  type: ActionTypes.SET_LOADING,
  payload: boolean,
}

type SetErrorAction = {
  type: ActionTypes.SET_ERROR,
  payload: GenericError | null,
}

type Action = SetDataAction | SetLoadingAction | SetErrorAction;

const defaultAppState: AppState = {
  selectedFact: null,
  data: null,
  isLoading: true,
  error: null,
}

/**
 * The main component of the application.
 * It fetches cat facts from the API and displays them.
 */
function App() {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    (state, action) => {
      switch (action.type) {
        case ActionTypes.SET_DATA: {
          return {
            ...state,
            data: action.payload,
          }
        }
        case ActionTypes.SET_LOADING: {
          return {
            ...state,
            isLoading: action.payload,
          }
        }
        case ActionTypes.SET_ERROR: {
          return {
            ...state,
            error: action.payload,
          }
        }
        default:
          throw new Error("Invalid action type")
      }
      return state
    }, defaultAppState)

  useEffect(() => {
    async function fetchCatFact() {
      try {
        const response = await fetch(CAT_FACT_URL);

        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          const data = await response.json();
          dispatch({
            type: ActionTypes.SET_DATA,
            payload: data,
          })
        }
      } catch (error) {
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: {
            statusText: "There was an issue loading this page.",
          },
        })
      } finally {
        dispatch({
          type: ActionTypes.SET_LOADING,
          payload: false,
        })
      }
    }
    fetchCatFact();
  }, []);

  /**
   * Renders the main content of the application.
   * @returns A JSX element representing the main content.
   */
  return (
    <main>
      {
        // If an error occurred during fetching, display an error message.
        state.error
          ? <p>{state.error.statusText}</p>
          // If the data is still loading, display a loading message.
          : state.isLoading
            ? <p>Loading...</p>
            // If the data is successfully fetched, display a list of cat facts.
            : <ul>
              {
                // Map over the fetched data and create a list item for each fact.
                state.data?.map(fact => {
                  // Return a JSX element representing a list item.
                  return (
                    <li key={fact._id}>
                      {fact.text} {" "}
                      <small>{new Date(fact.updatedAt).toLocaleDateString()}</small>
                    </li>
                  )
                })
              }
            </ul>
      }
    </main>
  );
}

export default App
