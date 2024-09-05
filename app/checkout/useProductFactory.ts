import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Product, Status } from "@/types/Product";

export default function useProductFactory<Data>(
  endpoint: string,
  onAdd: () => void,
  onError: () => void
): Product<Data> {
  // Fetch the initial data using SWR
  const { data, error, isLoading, mutate } = useSWR<Data>(endpoint, fetcher);

  // Function used to update the product
  async function updateProduct(url: string, { arg: body }: { arg: Data }) {
    try {
      const response = await fetch(url, {
        // The backend sends the initial state in the initial request. After the state is mutated, it is sent back to the backend using a PUT request
        method: "PUT",
        body: JSON.stringify(body), // Assuming JSON format, adjust as needed
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const updatedData = await response.json();

      // Update the SWR cache with the new data
      mutate((currentData) => {
        if (!currentData) return updatedData; // if no current data, return the new data
        return {
          ...currentData,
          ...updatedData, // Assuming the updated data is merged with the current data
        };
      }, false); // `false` tells SWR to not revalidate after mutation

      // Trigger onAdd callback on successful update
      onAdd();

      return updatedData;
    } catch (err) {
      // Handle error and trigger onError callback
      onError();
      throw err; // Re-throw to ensure the mutation state is updated accordingly
    }
  }

  // Handle updating the product using SWR Mutation
  const { trigger, isMutating } = useSWRMutation(endpoint, updateProduct);

  const status = getStatus(error, isLoading, isMutating);

  return { data, status, trigger };
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// Helper function to get the status based on error, loading, and mutating states
const getStatus = (
  error: Error,
  isLoading: boolean,
  isMutating: boolean
): Status => {
  if (error) return "error";
  if (isLoading) return "loading";
  if (isMutating) return "mutating";
  return "ok";
};
