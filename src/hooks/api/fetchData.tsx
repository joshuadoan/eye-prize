import { Data } from "../../types";

/**
 * Simulates fetching paginated data from an API.
 * @param {number} currentPage - The current page number to fetch data for.
 * @param {number} itemsPerPage - The number of items to fetch per page.
 * @returns {Promise<Object>} A promise that resolves to an object containing the data for the current page.
 */
export function fetchData(currentPage: number, itemsPerPage: number, searchTerm?: string): Promise<{
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  data: Data[];
}> {
  console.log("Fetching");
  // Mock data array with 1000 items
  const allItems = Array.from({ length: 1000 }, (v, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description of item ${i + 1}`
  }));

  const filtered = allItems.filter(item => {
    if (!searchTerm) {
      return true;
    }

    const match = (item.description + item.name);
    if (match.includes(searchTerm)) {
      return true;
    }

    return false;
  });

  return new Promise((resolve) => {
    // Simulate a delay to mimic network request
    setTimeout(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageItems = filtered.slice(startIndex, endIndex);

      resolve({
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / itemsPerPage),
        data: pageItems,
      });
    }, 1000); // Simulate network latency with 1 second delay
  });
}
