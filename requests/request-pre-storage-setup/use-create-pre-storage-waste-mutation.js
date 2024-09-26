import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useCreatePreStorageWasteMutation() {
  const queryClient = useQueryClient();

  const createPreStorageWasteMutation = async (formData) => {
    try {
      const response = await axios.post("/api/pre-storage-setup", formData);
      return response.data;
    } catch (error) {
      console.error("Failed to create new Pre-Storage Waste", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: createPreStorageWasteMutation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["PreStorageWasteQueryKey"],
      });

      // Toast a success message
      toast.success("Pre-Storage Waste created successfully.", {
        autoClose: 2000,
      });
    },
  });

  return mutation;
}