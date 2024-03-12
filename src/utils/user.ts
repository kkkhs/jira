import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObject } from "./index";

import { User } from "../types/user";
import { useQuery } from "react-query";
import { Project } from "../types/project";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param }),
  );
};
