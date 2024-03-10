import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject, useMount } from "./index";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  //key用["projects", param]实现当param变化时触发
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param }),
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      // 实现即时刷新
      onSuccess: () => queryClient.invalidateQueries("projects"),
    },
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      }),
    {
      // 实现即时刷新
      onSuccess: () => queryClient.invalidateQueries("projects"),
    },
  );
};
