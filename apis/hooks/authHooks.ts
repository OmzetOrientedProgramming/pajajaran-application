import {login} from "../services/authService";
import {useMutation} from "react-query";

export function useLogin() {
  return useMutation(login);
}