import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  const { tryLocalSingin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSingin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
