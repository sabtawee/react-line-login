import React, { useState, useEffect } from "react";
import { init, getAccessToken } from "@line/liff";

function LoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const login = async () => {
    try {
      await init({ liffId: "1660696979-LGe664bN" });
      if (!isLoggedIn) {
        await getAccessToken();
        const profile = await liff.getProfile();
        console.log(profile);
        setUserProfile(profile);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await liff.logout();
      setIsLoggedIn(false);
      setUserProfile(null);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {!isLoggedIn ? (
        <button onClick={login}>Log in with Line</button>
      ) : (
        <>
          <p>Logged in as: {userProfile.displayName}</p>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </>
  );
}

export default LoginComponent;
