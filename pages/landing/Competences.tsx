import React from "react";
import MacbookScroll from "@/components/ui/MacbookScroll";

const Competences = () => {
  return (
    <section
      className="relative z-10 min-h-[125vh] w-screen overflow-hidden bg-black-500 md:min-h-[100vh]"
      style={{
        boxShadow: "0 50px 75px -12px rgb(0 0 0 / 0.25)",
        position: "relative",
      }}
    >
      <MacbookScroll />
    </section>
  );
};

export default Competences;
