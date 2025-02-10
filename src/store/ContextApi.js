import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  //로컨스토리지 토큰을 가져온다
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;
  //로컬스토리지 유저가 관리자인지 가져온다
  const isADmin = localStorage.getItem("IS_ADMIN")
    ? JSON.stringify(localStorage.getItem("IS_ADMIN"))
    : false;

  //토큰 상태관리
  const [token, setToken] = useState(getToken);

  //현재 로그인 유저 관리
  const [currentUser, setCurrentUser] = useState(null);
  //관리자 패널 관리
  const [openSidebar, setOpenSidebar] = useState(true);
  //관리자인지 확인
  const [isAdmin, setIsAdmin] = useState(isADmin);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("USER"));

    if (user?.username) {
      try {
        const { data } = await api.get(`/auth/user`);
        const roles = data.roles;

        if (roles.includes("ROLE_ADMIN")) {
          localStorage.setItem("IS_ADMIN", JSON.stringify(true));
          setIsAdmin(true);
        } else {
          localStorage.removeItem("IS_ADMIN");
          setIsAdmin(false);
        }
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user", error);
        toast.error("Error fetching current user");
      }
    }
  };

  //처음 시작시 또는 토큰이 바뀔때마다 유저정보를 가져온다
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  //컨텍스트 프로바이더가 value의 모든 컴포넌트에 제공한다
  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        openSidebar,
        setOpenSidebar,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

//useMyContext()로 이 컨텍스트를 사용한다
export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
