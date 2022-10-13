import Head from "next/head";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [halbzeit, setHalbzeit] = useState("1");
  const countRef = useRef(null);

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    // const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getMinutes} : ${getSeconds}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  return (
    <>
      <Head>
        <title>Zeitanzeige</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        role="contentinfo"
        className="h-screen w-screen flex flex-col justify-center items-center"
      >
        <p className="text-lg lg:text-5xl xl:text-5xl text-gray-700">
          {halbzeit}. HZ
        </p>
        <p className="text-2xl lg:text-9xl xl:text-9xl text-gray-700">
          {formatTime()}
        </p>

        <main className="flex flex-col gap-2 w-screen absolute items-center bottom-10">
          <section
            role="application"
            className="flex flex-row gap-2 border-green-500 "
          >
            {!isActive && !isPaused ? (
              <button
                className="border-2 p-2 border-gray-500 w-32 bg-sky-500 text-white"
                onClick={handleStart}
              >
                Start
              </button>
            ) : isPaused ? (
              <button
                className="border-2 p-2 border-gray-500 w-32"
                onClick={handlePause}
              >
                Pause
              </button>
            ) : (
              <button
                className="border-2 p-2 border-gray-500 w-32"
                onClick={handleResume}
              >
                Fortsetzen
              </button>
            )}
            <button
              className="border-2 p-2 border-gray-500 w-32 bg-red-500 text-white"
              onClick={handleReset}
              disabled={!isActive}
            >
              Zurücksetzen
            </button>
          </section>

          <section role="application" className="flex flex-row gap-2">
            <button
              className={`border border-blue-300 p-2 w-32 ${
                halbzeit === "1" ? "bg-sky-500 text-white" : ""
              }`}
              onClick={() => setHalbzeit("1")}
            >
              1. Halbzeit
            </button>
            <button
              className={`border border-blue-300 p-2 w-32 ${
                halbzeit === "2" ? "bg-sky-500 text-white" : ""
              }`}
              onClick={() => setHalbzeit("2")}
            >
              2. Halbzeit
            </button>
          </section>
        </main>
      </section>
    </>
  );
};

export default Home;
