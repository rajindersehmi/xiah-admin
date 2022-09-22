import { useCallback } from "react";
import { useSelector } from "react-redux";

const useRestriction = () => {
  const user = useSelector((state) => state.auth.user);

  const isRestricted = useCallback(
    (permission) => {
      // this is a hack to allow access to all routes
      // to make development easier
      if (!permission) return false;

      if (user?.roles && user.roles.length) {
        const listofPermissions = user.roles[0].permissions.map((p) => p.name);
        const isAllowed = listofPermissions.includes(permission);

        return !isAllowed;
      }

      return false;
    },
    [user?.roles]
  );

  return isRestricted;
};
export default useRestriction;
