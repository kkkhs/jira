import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";

export const AnthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}></button>
      <ProjectListScreen />
    </div>
  );
};
