import "simpledotcss/simple.min.css"
import useFetch from './useFetch'
import { Fact } from "./types"
import { CAT_FACT_URL } from "./consts"

/**
 * The main component of the application.
 * It fetches cat facts from the API and displays them.
 */
function App() {
  const { data, isLoading, error } = useFetch<Fact[]>(CAT_FACT_URL);

  /**
   * Renders the main content of the application.
   * @returns A JSX element representing the main content.
   */
  return (
    <main>
      {
        // If an error occurred during fetching, display an error message.
        error
          ? <p>{error.statusText}</p>
          // If the data is still loading, display a loading message.
          : isLoading
            ? <p>Loading...</p>
            // If the data is successfully fetched, display a list of cat facts.
            : <ul>
              {
                // Map over the fetched data and create a list item for each fact.
                data?.map(fact => {
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
