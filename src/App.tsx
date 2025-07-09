import { Route, Routes } from "react-router-dom";
import { Home } from "./modules";
import { useAppDispatch, useAppSelector } from "./stores/redux/hooks";
import { useEffect } from "react";
import { setUser } from "./stores/redux/slices/authSlice";

interface AppComponent {
  user?: unknown;
}

function App({ user }: AppComponent) {
  const dispatch = useAppDispatch();

  const store = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  console.log("SALES", store);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sales" element={<div>SALES</div>} />
    </Routes>
  );
}

export { App };
