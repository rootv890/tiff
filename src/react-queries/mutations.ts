/**
 * All mutation options at one place
 */
"use client";
import { createServerAction, CreateServerType } from "@/actions/mutations";
import { QUERY_KEYS } from "@/queryKeys";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const createServerMutationOptions = (
  data: CreateServerType,
  onSuccess: (data: unknown) => void,
  onError: (error: unknown) => void,
): MutationOptions => {
  return {
    mutationKey: [QUERY_KEYS.CREATE_SERVER],
    mutationFn: () => {
      return createServerAction(data);
    },
    onSuccess,
    onError,
  };
};
// hook
export const useCreateServerMutation = (
  data: CreateServerType,
  onSuccess: (data: unknown) => void,
  onError: (error: unknown) => void,
) => {
  return useMutation(createServerMutationOptions(data, onSuccess, onError));
};
