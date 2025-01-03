"use client";

import { InlineWidget } from "react-calendly";
import Navbar from "@/components/Navbar";

const Book = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-black/[0.96] bg-grid-white/[0.02]">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1
          className="text-4xl pb-5 md:text-6xl text-center 
          bg-clip-text text-transparent bg-gradient-to-b 
          from-neutral-50 to-neutral-400 bg-opacity-50"
        >
          Book a meeting
        </h1>

        {/* Calendly Widget */}
        <div className="w-full max-w-4xl px-4">
          <InlineWidget url="https://calendly.com/birdsoftware/15min" />
        </div>
      </main>
    </div>
  );
};

export default Book;
