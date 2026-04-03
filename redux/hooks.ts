import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useFetchResourceQuery } from "./api/commonApi";
import { authRoutes } from "@/constants/end-point";
import { tagTypes } from "./tag-types";
import { UseAuthReturn } from "@/types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState ) => TSelected,
) => useSelector<RootState, TSelected>(selector);

export const useAuth = (): UseAuthReturn => {
  const { data, isLoading } = useFetchResourceQuery({
    url: authRoutes.getMyProfile,
    tags: [tagTypes.auth],
  });

  const userData = data?.data ?? null;
  const isAuthenticated = !!userData;

  const dispatch = useAppDispatch();

  return {
    user: userData,
    dispatch,
    isAuthLoading: isLoading,
    isAuthenticated,
  };
};

export const usePosts = () => {
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  return { ...posts, dispatch };
};

export const useComments = () => {
  const comments = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();
  return { ...comments, dispatch };
};

export const useUI = () => {
  const ui = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  return { ...ui, dispatch };
};
