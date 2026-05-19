import { useEffect, useState } from "react";
import { API } from "../constants/api";

export function useProfiles() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/profiles`)
      .then((r) => r.json())
      .then((json) => {
        setData(Array.isArray(json) ? json : json.profiles ?? json.data ?? []);
        setLoading(false);
      })
      .catch((e) => { setError(e); setLoading(false); });
  }, []);

  return { data, loading, error };
}

export function useProfileDetail(id) {
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const base = `${API}/profiles/${id}`;

    Promise.all([
      fetch(base).then((r) => r.json()),
      fetch(`${base}/experiences`).then((r) => r.json()),
      fetch(`${base}/educations`).then((r) => r.json()),
      fetch(`${base}/skills`).then((r) => r.json()),
      fetch(`${base}/projects`).then((r) => r.json()),
      fetch(`${base}/contacts`).then((r) => r.json()),
    ])
      .then(([p, exp, edu, sk, proj, cont]) => {
        setProfile(p.profile ?? p.data ?? p);
        setExperiences(arr(exp));
        setEducations(arr(edu));
        setSkills(arr(sk));
        setProjects(arr(proj));
        setContacts(arr(cont));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return { profile, experiences, educations, skills, projects, contacts, loading };
}

function arr(json) {
  if (Array.isArray(json)) return json;
  return json?.data ?? json?.experiences ?? json?.educations ??
    json?.skills ?? json?.projects ?? json?.contacts ?? [];
}