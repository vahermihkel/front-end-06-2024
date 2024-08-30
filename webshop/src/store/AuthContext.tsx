import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

// Create a Context for the app
export const AuthContext = createContext({ 
  loggedIn: false, 
  setLoggedIn: (value: boolean) => {}, 
  error: "", 
  fetching: false, 
  setError: (value: string) => {}
});

// Create a provider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
  // State that will be shared in the context
  const url = "https://securetoken.googleapis.com/v1/token?key=" + process.env.REACT_APP_FIREBASE_KEY;
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);

  const determineIfLoggedIn = useCallback(() => {
    if (sessionStorage.getItem("refreshToken") !== null) {
      const payload = {
        "grant_type": "refresh_token",
        "refresh_token": sessionStorage.getItem("refreshToken")
      }

      fetch(url, {method: "POST", body: JSON.stringify(payload), headers: {"Content-Type": "application/json"}})
        .then(res => res.json())
        .then(json => {
          setFetching(false);
          if (json.error === undefined) {
            sessionStorage.setItem("idToken", json.id_token);
            setLoggedIn(true);
          } else {
            setError(json.error.message);
            setLoggedIn(false);
            sessionStorage.clear();
          }
        })
    } else {
      setLoggedIn(false);
      sessionStorage.clear();
      setFetching(false);
    }
  }, [url]);

  useEffect(() => {
    determineIfLoggedIn();
  }, [determineIfLoggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, error, fetching, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

