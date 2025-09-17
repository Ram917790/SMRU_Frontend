// C:\Projects\my_fullstack_app\frontend1\my-app\src\pages\Schools.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { schools } from "../data/schools";

const NAVY = "#0d315c";
const GREEN = "#009f6f";
const ORANGE = "#ffaf3a";
const WHITE = "#FFFFFF";

const slugify = (s = "") =>
  s.toString().trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function Schools() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const items = (schools || []).map((s) => ({
    ...s,
    slug: s.slug || slugify(s.name),
    deptCount: s.departments?.length || 0,
    programCount: s.departments?.reduce((n, d) => n + (d.programs?.length || 0), 0) || 0,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="rounded-2xl p-6 shadow-sm border" style={{ background: WHITE, borderColor: ORANGE }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: NAVY }}>
              Schools at St. Mary’s Rehabilitation University
            </h1>
            <p className="mt-2 text-sm" style={{ color: NAVY }}>
              Pick a school from the sidebar or cards. Yellow badges show quick counts.
            </p>
          </div>
          <a
            href="https://admissions.smru.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl font-semibold"
            style={{ background: GREEN, color: WHITE }}
          >
            Apply / Enquire
          </a>
        </div>
      </div>

      {/* Mobile toggle for sidebar */}
      <div className="mt-4 md:hidden">
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          className="w-full px-4 py-2 rounded-xl font-semibold"
          style={{ border: `2px solid ${NAVY}`, color: NAVY, background: WHITE }}
        >
          {openSidebar ? "Hide Schools ▲" : "Show Schools ▼"}
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[260px,1fr]">
        {/* Sidebar (ONLY here) */}
        <aside className={`${openSidebar ? "block" : "hidden"} md:block h-max`}>
          <div className="rounded-2xl p-4 shadow-sm border" style={{ background: WHITE, borderColor: NAVY }}>
            <div className="text-xs font-bold tracking-wide" style={{ color: NAVY }}>
              SCHOOLS
            </div>
            <ul className="mt-3 space-y-2">
              {items.map((s) => (
                <li key={s.slug}>
                  <NavLink
                    to={`/schools/${s.slug}`}
                    className={({ isActive }) =>
                      [
                        "block rounded-xl px-3 py-2 text-sm font-semibold transition",
                        isActive ? "text-white" : "",
                      ].join(" ")
                    }
                    style={({ isActive }) => ({
                      background: isActive ? GREEN : WHITE,
                      border: `1px solid ${NAVY}`,
                      color: isActive ? WHITE : NAVY,
                    })}
                  >
                    {s.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Cards */}
        <section>
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((s) => (
              <Link
                key={s.slug}
                to={`/schools/${s.slug}`}
                className="block rounded-2xl p-5 shadow-sm transition hover:shadow-md border"
                style={{ background: WHITE, borderColor: NAVY }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold" style={{ color: NAVY }}>
                    {s.name}
                  </h2>
                  <span
                    className="text-[11px] px-2 py-1 rounded-full"
                    style={{ background: WHITE, color: NAVY, border: `1px solid ${ORANGE}` }}
                  >
                    {s.deptCount} Dept{s.deptCount === 1 ? "" : "s"}
                  </span>
                </div>
                {s.about && (
                  <p className="mt-3 text-sm leading-relaxed line-clamp-3" style={{ color: NAVY }}>
                    {s.about}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span
                    className="px-2 py-1 rounded-full font-semibold"
                    style={{ background: WHITE, color: NAVY, border: `1px solid ${GREEN}` }}
                  >
                    Programs: {s.programCount}
                  </span>
                  <span
                    className="px-2 py-1 rounded-full font-semibold"
                    style={{ background: WHITE, color: NAVY, border: `1px solid ${ORANGE}` }}
                  >
                    View departments →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
