import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject, useMount } from "./index";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "../screens/project-list/util";
import { prettyFormat } from "@testing-library/react";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  //key用["projects", param]实现当param变化时触发
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param }),
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey),
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    },
  );
};
