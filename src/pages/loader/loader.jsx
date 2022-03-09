import React, { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(false);

  const WaitingForSomething = (delay = 0) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, delay);
    });
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      await WaitingForSomething(1e3);
      setLoading(false);
    })();
  }, []);
  return <div>{loading ? <div>Loading...</div> : <div>Loaded!</div>}</div>;
}
