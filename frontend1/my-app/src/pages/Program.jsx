// C:\Projects\my_fullstack_app\frontend1\my-app\src\pages\Program.jsx
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
const findDept = (school, param) => {
  const decoded = decodeURIComponent(param || "").toLowerCase();
  return (
    school?.departments?.find((d) => (d.slug || "").toLowerCase() === decoded) ||
    school?.departments?.find((d) => slugify(d.name) === decoded) ||
    null
  );
};
const findProgram = (dept, param) => {
  const decoded = decodeURIComponent(param || "").toLowerCase();
  return (
    dept?.programs?.find((p) => (p.slug || "").toLowerCase() === decoded) ||
    dept?.programs?.find((p) => slugify(p.name) === decoded) ||
    null
  );
};

export default function Program() {
  const { schoolSlug, deptSlug, programSlug } = useParams();

  const school = findSchool(schoolSlug);
  const dept = findDept(school, deptSlug);
  const prog = findProgram(dept, programSlug);

  if (!school || !dept || !prog) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-2xl p-6 shadow-sm border" style={{ background: WHITE, borderColor: NAVY }}>
          <h1 className="text-lg font-bold" style={{ color: NAVY }}>Program not found.</h1>
          <div className="mt-4 flex gap-2">
            <Link
              to="/schools"
              className="px-4 py-2 rounded-xl font-semibold"
              style={{ color: NAVY, border: `2px solid ${NAVY}`, background: WHITE }}
            >
              ← All Schools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const schoolSlugSafe = school.slug || slugify(school.name);
  const deptSlugSafe = dept.slug || slugify(dept.name);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header (solid, no sidebar) */}
      <div className="rounded-2xl p-6 shadow-sm border" style={{ background: WHITE, borderColor: ORANGE }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: NAVY }}>
              {prog.name}
            </h1>
            {prog.level && <div className="text-sm font-semibold mt-1" style={{ color: NAVY }}>{prog.level}</div>}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link
              to={`/schools/${schoolSlugSafe}/${deptSlugSafe}`}
              className="px-4 py-2 rounded-xl font-semibold w-full sm:w-auto text-center"
              style={{ color: NAVY, background: WHITE, border: `2px solid ${NAVY}` }}
            >
              ← {dept.name}
            </Link>
            <a
              href="https://admissions.smru.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl font-semibold w-full sm:w-auto text-center"
              style={{ background: GREEN, color: WHITE }}
            >
              Apply / Enquire
            </a>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="rounded-2xl p-6 shadow-sm border mt-6" style={{ background: WHITE, borderColor: NAVY }}>
        <h2 className="text-xl font-bold" style={{ color: GREEN }}>Program Overview</h2>
        {prog.overview ? (
          <p className="mt-3 leading-relaxed" style={{ color: NAVY }}>
            {prog.overview}
          </p>
        ) : (
          <p className="mt-3" style={{ color: NAVY }}>Details coming soon.</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {prog.duration && (
            <span className="px-3 py-1 rounded-full font-semibold" style={{ background: WHITE, color: NAVY, border: `1px solid ${NAVY}` }}>
              Duration: {prog.duration}
            </span>
          )}
          {prog.eligibility && (
            <span className="px-3 py-1 rounded-full font-semibold" style={{ background: WHITE, color: NAVY, border: `1px solid ${GREEN}` }}>
              Eligibility: {prog.eligibility}
            </span>
          )}
          {prog.fees && (
            <span className="px-3 py-1 rounded-full font-semibold" style={{ background: WHITE, color: NAVY, border: `1px solid ${ORANGE}` }}>
              Tuition: {prog.fees}
            </span>
          )}
        </div>
      </section>

      {/* Detail blocks */}
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {prog.eligibility && (
          <section className="rounded-2xl p-6 shadow-sm border" style={{ background: WHITE, borderColor: NAVY }}>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>Eligibility</h3>
            <p className="mt-2 leading-relaxed" style={{ color: NAVY }}>{prog.eligibility}</p>
          </section>
        )}
        {prog.duration && (
          <section className="rounded-2xl p-6 shadow-sm border" style={{ background: WHITE, borderColor: NAVY }}>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>Duration</h3>
            <p className="mt-2 leading-relaxed" style={{ color: NAVY }}>{prog.duration}</p>
          </section>
        )}
        {prog.fees && (
          <section className="rounded-2xl p-6 shadow-sm border" style={{ background: WHITE, borderColor: NAVY }}>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>Tuition Fee</h3>
            <p className="mt-2 leading-relaxed" style={{ color: NAVY }}>{prog.fees}</p>
          </section>
        )}
        {prog.outcomes && (
          <section className="rounded-2xl p-6 shadow-sm border" style={{ background: WHITE, borderColor: NAVY }}>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>Career Outcomes</h3>
            <p className="mt-2 leading-relaxed" style={{ color: NAVY }}>{prog.outcomes}</p>
          </section>
        )}
      </div>

      {/* Specializations */}
      {Array.isArray(prog.specializations) && prog.specializations.length > 0 && (
        <section className="rounded-2xl p-6 shadow-sm border mt-6" style={{ background: WHITE, borderColor: NAVY }}>
          <h3 className="text-lg font-bold" style={{ color: NAVY }}>Specializations</h3>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2">
            {prog.specializations.map((s, i) => (
              <li
                key={i}
                className="px-3 py-1 rounded-full font-semibold border"
                style={{ borderColor: NAVY, color: NAVY, background: WHITE }}
              >
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Accreditation */}
      {prog.accreditation && (
        <section className="rounded-2xl p-6 shadow-sm border mt-6" style={{ background: WHITE, borderColor: NAVY }}>
          <h3 className="text-lg font-bold" style={{ color: NAVY }}>Accreditation / Recognition</h3>
          <p className="mt-2 leading-relaxed" style={{ color: NAVY }}>{prog.accreditation}</p>
        </section>
      )}
    </div>
  );
}
