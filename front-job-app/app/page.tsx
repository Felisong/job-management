"use client";

import type { JobInformationModel } from "@/types";
import { useEffect, useRef, useState } from "react";
import JobDisplayList from "./components/JobDisplayList";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export default function Home() {
  const observerRef = useRef<HTMLDivElement>(null);
  const [lastJobId, setLastJobId] = useState<string>("");
  const [jobs, setJobs] = useState<JobInformationModel[]>([]);
  const [hasMoreJobs, setHasMoreJobs] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false);

  async function fetchJobs() {
    try {
      setLoading(true);
      console.log(`this is the id searching: `, typeof lastJobId);
      const url = lastJobId
        ? `${baseUrl}/jobs?lastJobId=${lastJobId}`
        : `${baseUrl}/jobs`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Unable to fetch from API`);
      }
      const data = await res.json();
      console.log(data);
      setJobs((jobs) => [...jobs, ...data.jobs]);
      setHasMoreJobs(data.nextExpectedId ? true : false);
      setLastJobId(data.nextExpectedId?.toString());
      setInitialized(true);
    } catch (err: any) {
      console.error(`error fetching jobs: `, err);
      if (err.startsWith("TypeError: Failed to fetch")) {
        setErrMessage("Failed to communicate with API");
      } else {
        setErrMessage(`Failed fetching data: ` + err);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchJobs();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // if  item is intersecting, and more jobs is true, loading is false and initial data loaded correctly
      if (entries[0].isIntersecting && hasMoreJobs && !loading && initialized) {
        console.log(`fetching more jobs!`);
        fetchJobs();
      }
    });
    // if the div exists, then mark it to observe it by the observer
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    // clean up the observer on unmount!
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMoreJobs, loading]);

  return (
    <div className="p-8">
      <p>Query and filters will be here</p>

      <div className="bg-amber-950">
        <JobDisplayList jobs={jobs}></JobDisplayList>
        <div ref={observerRef}></div>
      </div>
    </div>
  );
}
