"use client";
import * as React from "react";

export default function SwipeableTemporaryDrawer() {
  // function to get a clock that updates every second
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <h3>Welcome to the UniCompanion dashboard</h3>
          <h1>{time.toDateString()}</h1>
          <h1 style={{fontSize: 70}}>{time.getHours()}:{time.getMinutes()}</h1>
        </div>
      </section>
    </div>
  );
}
