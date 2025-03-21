import React from "react";
import { Link } from "react-router-dom";
import Buttons from "../utils/Buttons";
import { motion } from "framer-motion";
import Brands from "./LandingPageCom/Brands/Brands";
import State from "./LandingPageCom/State";
import Testimonial from "./LandingPageCom/Testimonial/Testimonial";
import { useMyContext } from "../store/ContextApi";

//위에서 내려오는 페이지
const fadeInFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
//아래에서 올라오는 페이지
const fadeInFromBotom = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
//컨텍스트에서 토큰을 가져온다
const LandingPage = () => {
  // Access the token  state by using the useMyContext hook from the ContextProvider
  const { token } = useMyContext();

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center">
      <div className="lg:w-[80%] w-full py-16  space-y-4  ">
        <motion.h1
          className="font-montserrat uppercase text-headerColor  xl:text-headerText md:text-4xl text-2xl mx-auto text-center font-bold sm:w-[95%] w-full"
          initial="hidden"
          animate="visible"
          variants={fadeInFromTop}
        >
          누구든지 원하는 노트를 작성해 보세요!
        </motion.h1>
        <h3 className="text-logoText md:text-2xl text-xl font-semibold text-slate-800 text-center">
          The #1 secure note-taking app.
        </h3>
        <p className="text-slate-700 text-center sm:w-[80%] w-[90%] mx-auto">
          Manage your notes effortlessly and securely. Just type, save, and
          access them from anywhere with robust encryption and seamless
          synchronization.
        </p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInFromBotom}
          className="flex items-center justify-center gap-3 py-10 "
        >
          {/* 토큰이 있으면 노트작성버튼, 없으면 로그인과 가입하기가 보인다 */}
          {token ? (
            <>
              <Link to="/create-note">
                <Buttons className="sm:w-52 w-44 bg-customRed font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  Create Note
                </Buttons>
              </Link>
              <Link to="/notes">
                <Buttons className="sm:w-52 w-44 bg-btnColor font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  My Notes
                </Buttons>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Buttons className="sm:w-52 w-44 bg-customRed font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  로그인
                </Buttons>
              </Link>
              <Link to="/signup">
                <Buttons className="sm:w-52 w-44 bg-btnColor font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  가입하기
                </Buttons>
              </Link>
            </>
          )}
        </motion.div>
        .
        <div className="sm:pt-14 pt-0 xl:px-16 md:px-10">
          <h1 className="font-montserrat uppercase text-headerColor  xl:text-headerText md:text-4xl text-2xl  mx-auto text-center font-bold  w-full">
            More Reasons Company Around the world workable
          </h1>
          <Brands />
          <State />
          <div className="pb-10">
            <h1
              className="font-montserrat uppercase text-headerColor pb-16  xl:text-headerText md:text-4xl text-2xl  mx-auto text-center font-bold sm:w-[95%] w-full"
              variants={fadeInFromBotom}
            >
              Testimonial
            </h1>
            <Testimonial />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
