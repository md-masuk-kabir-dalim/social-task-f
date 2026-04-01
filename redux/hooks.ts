import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState ) => TSelected,
) => useSelector<RootState, TSelected>(selector);

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return { ...auth, dispatch };
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
