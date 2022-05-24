import { useMutation } from "react-query";
import { updateBusinessProfile } from "../services/updateBusinessProfileService";

export function useUpdateProfile() {
    return useMutation(updateBusinessProfile);
  }
  