"use client";
import axios from "axios";

// Helper function for API requests - properly handles errors and success responses
const handleApiRequest = async (apiCall: () => Promise<any>): Promise<any> => {
   try {
      const response = await apiCall();
      // Some callers return the full Axios response, others already return data.
      if (response && typeof response === "object" && "data" in response) {
         return (response as any).data;
      }
      return response;
   } catch (error) {
      // If it's an Axios error with a response from the server
      if (axios.isAxiosError(error) && error.response) {
         console.error("API Error:", error.response.status, error.response.data);
         // Throw the error so mutations can handle it properly
         throw error;
      } else {
         // For network errors or other unexpected errors
         console.error("Unexpected error:", error);
         throw error;
      }
   }
};

export default handleApiRequest;
