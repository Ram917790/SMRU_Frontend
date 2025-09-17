// src/pages/Leadership.jsx
import React from "react";
import { Link } from "react-router-dom";
import { leaders } from "../data/leaders";

// simple card without images
function LeaderCard({ p }) {
  const Wrapper = p.slug ? Link : "div";
  const props = p.slug ? { to: `/leaders/${p.slug}`, "aria-label": `View profile of ${p.name}` } : {};
  return (
    <Wrapper
      {...props}
      className={[
        "group rounded-2xl bg-white ring-1 ring-slate-200 p-5",
        "hover:ring-[#0f6a5a]/40 shadow-sm hover:shadow-md transition",
        p.slug ? "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2" : "",
      ].join(" ")}
    >
      <div className="text-[13px] font-semibold text-emerald-800">Name:</div>
      <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>

      <div className="mt-3 text-[13px] font-semibold text-emerald-800">Designation:</div>
      <p className="text-[0.98rem] text-slate-800">{p.role}</p>

      <div className="mt-3 text-[13px] font-semibold text-emerald-800">About:</div>
      <p
        className="text-slate-700 leading-relaxed"
        style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {p.about}
      </p>

      {p.slug && (
        <div className="mt-4 inline-flex items-center gap-2 text-[#0f6a5a] font-semibold">
          <span>View Profile</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>
        </div>
      )}
    </Wrapper>
  );
}

export default function Leadership() {
  return (
    <>
      {/* Banner */}
      <section className="relative w-full min-h-[32vh] bg-[linear-gradient(135deg,#0d315c_0%,#0b3a7a_50%,#019e6e_100%)]">
        <div className="container max-w-screen-xl mx-auto px-4 pt-28 pb-10">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold">Leadership</h1>
          <p className="mt-2 text-white/90 text-lg">Meet the people guiding St. Mary’s Rehabilitation University.</p>
        </div>
      </section>

      {/* Grid of all leaders */}
      <main className="py-12 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((p) => (
              <LeaderCard key={p.slug || p.name} p={p} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
