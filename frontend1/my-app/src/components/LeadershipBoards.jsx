// src/components/LeadershipBoards.jsx
import React from "react";
import { Link } from "react-router-dom";

/** Single card (no images). Order: Name → About → Designation → (View Profile) */
function Card({ m = {} }) {
  const name = m.name || "—";
  const role = m.role || "—";
  const about = m.about || "";

  return (
    // 🔴 changed to baby pink background
    <article className="rounded-xl bg-[#faedf2] p-4">
      {/* Name */}
      <h3 className="text-base font-bold text-slate-900">{name}</h3>

      {/* About (3-line clamp, no label) */}
      {about ? (
        <p
          className="mt-2 text-slate-800 leading-relaxed"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {about}
        </p>
      ) : null}

      {/* Designation */}
      <p className="mt-3 text-emerald-800 font-semibold">
        Designation:
        <span className="ml-1 text-slate-900 font-normal">{role}</span>
      </p>

      {/* View Profile (only when slug is present) */}
      {m.slug ? (
        <div className="mt-3">
          <Link
            to={`/leaders/${m.slug}`}
            className="inline-flex items-center gap-2 text-[#0f6a5a] font-semibold hover:underline"
          >
            View Profile
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
          </Link>
        </div>
      ) : null}
    </article>
  );
}

/**
 * Boards for: Governing Council, Board of Mgt - BOM, Academic Council
 * Props:
 *  - groups: { [title: string]: Array<{ name, role, about?, slug? }> }
 */
function LeadershipBoards({ groups }) {
  const entries = Object.entries(groups || {});
  if (!entries.length) return null;

  return (
    <section className="py-10 bg-slate-50">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {entries.map(([title, members], idx) => {
            const list = Array.isArray(members) ? members : [];
            return (
              <div
                key={title}
                className={[
                  "rounded-2xl border border-slate-200 bg-white p-5",
                  // vertical partition line on large screens (except first col)
                  idx > 0
                    ? "lg:border-l-0 lg:pl-6 lg:relative lg:before:absolute lg:before:inset-y-5 lg:before:-left-3 lg:before:w-px lg:before:bg-slate-200"
                    : "",
                ].join(" ")}
              >
                {/* Section header chip */}
                <div className="inline-block rounded-md bg-[#0d315c] px-4 py-2 text-white text-sm font-semibold">
                  {title}
                </div>

                {/* Cards */}
                <div className="mt-4 space-y-4">
                  {list.length === 0 ? (
                    // 🔴 placeholder card also baby pink
                    <div className="rounded-xl bg-[#ffe6ef] p-4">
                      <h3 className="text-base font-bold text-slate-900">Name</h3>
                      <p className="mt-3 text-emerald-800 font-semibold">
                        Designation: <span className="text-slate-900 font-normal">—</span>
                      </p>
                    </div>
                  ) : (
                    list.map((m, i) => <Card key={`${m?.name || "item"}-${i}`} m={m} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LeadershipBoards;
