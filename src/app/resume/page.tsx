"use client";
import React from "react";

const HomePage = () => {
  return (
    <div className="container mx-auto p-4 md:px-16">
      <h1 className="mb-4 text-5xl font-thin">Resume Viewer</h1>
      <iframe
        src="/DUSHIME Aime P_RESUME.pdf"
        width="100%"
        height="600px"
        title="PDF Viewer"
      />
    </div>
  );
};

export default HomePage;
