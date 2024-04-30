import { useEffect, useState } from "react";

type GenericError = {
  statusText: string;
  status?: number;
};

type State<R> = {
  data: R | null;
  isLoading: boolean;
  error: GenericError | null;
};

/**
 * A custom React hook that fetches data from a specified URL.
 *
 * @param url - The URL to fetch data from.
 *
 * @returns An object containing the current state of the fetch operation:
 *  - `data`: The fetched data, or null if not yet loaded or if an error occurred.
 *  - `isLoading`: A boolean indicating whether the data is currently being loaded.
 *  - `error`: An object containing an error message if an error occurred during the fetch operation.
 */
function useFetch<R>(url: string): State<R> {
  const [state, setState] = useState<State<R>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchCatFact() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          const data = await response.json();
          setState((prev) => ({
            ...prev,
            data,
          }));
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: {
            statusText: "There was an issue loading this page.",
          },
        }));
      } finally {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    }
    fetchCatFact();
  }, []);

  return state;
}

export default useFetch;
