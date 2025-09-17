// C:\Projects\my_fullstack_app\frontend1\my-app\src\pages\School.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { schools } from "../data/schools";

const NAVY = "#0d315c";
const GREEN = "#009f6f";
const ORANGE = "#ffaf3a";
const WHITE = "#FFFFFF";

const slugify = (s = "") =>
  s.toString().trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const findSchool = (param) => {
  const decoded = decodeURIComponent(param || "").toLowerCase();
  return (
    schools.find((s) => (s.slug || "").toLowerCase() === decoded) ||
    schools.find((s) => slugify(s.name) === decoded) ||
    null
  );
};

export default function School() {
  const { schoolSlug } = useParams();
  const school = findSchool(schoolSlug);

  if (!school) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-2xl p-6 shadow-sm border" style={{ background: WHITE, borderColor: NAVY }}>
          <h1 className="text-lg font-bold" style={{ color: NAVY }}>School not found.</h1>
          <div className="mt-4">
            <Link
              to="/schools"
              className="px-4 py-2 rounded-xl font-semibold"
              style={{ color: NAVY, border: `2px solid ${NAVY}`, background: WHITE }}
            >
              ← Back to All Schools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const schoolSlugSafe = school.slug || slugify(school.name);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="rounded-2xl p-6 shadow-sm border" style={{ background: WHITE, borderColor: ORANGE }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: NAVY }}>
              {school.name}
            </h1>
            {school.about ? (
              <p className="mt-2" style={{ color: NAVY }}>
                {school.about}
              </p>
            ) : null}
          </div>
          <div className="flex gap-2">
            <Link
              to="/schools"
              className="px-4 py-2 rounded-xl font-semibold"
              style={{ color: NAVY, background: WHITE, border: `2px solid ${NAVY}` }}
            >
              ← All Schools
            </Link>
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
      </div>

      {/* Departments grid */}
      <section className="rounded-2xl overflow-hidden shadow-sm border mt-8" style={{ background: WHITE, borderColor: NAVY }}>
        <div className="p-6 border-b" style={{ borderColor: ORANGE }}>
          <h2 className="text-xl font-bold" style={{ color: NAVY }}>Departments</h2>
          <p className="mt-1 text-sm" style={{ color: NAVY }}>
            Choose a department to view its programs.
          </p>
        </div>
        <div className="p-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {(school.departments || []).map((dept) => {
            const deptSlug = dept.slug || slugify(dept.name);
            const programCount = dept.programs?.length || 0;
            return (
              <Link
                key={deptSlug}
                to={`/schools/${schoolSlugSafe}/${deptSlug}`}
                className="block rounded-2xl p-5 shadow-sm transition hover:shadow-md border"
                style={{ background: WHITE, borderColor: NAVY }}
              >
                <div className="h-1 rounded" style={{ background: GREEN }} />
                <div className="mt-3 text-lg font-bold" style={{ color: NAVY }}>
                  {dept.name}
                </div>
                {(dept.about || dept.description) && (
                  <p className="mt-2 text-sm" style={{ color: NAVY }}>
                    {dept.about || dept.description}
                  </p>
                )}
                <div className="mt-3 text-xs font-semibold" style={{ color: NAVY }}>
                  {programCount} {programCount === 1 ? "Program" : "Programs"}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
