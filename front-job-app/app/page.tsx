"use client";

import type { JobInformationModel } from "@/types";
import { useEffect, useRef, useState } from "react";
import JobDisplayList from "./components/JobDisplayList";
import SearchAndFilters from "./components/SearchAndFilters";
import FetchAllJobs from "./actions/FetchAllJobs";
import { useModal } from "./utils/context/AddModalContext";

export default function Home() {
  const { openModal } = useModal();
  const observerRef = useRef<HTMLDivElement>(null);
  const hasFetchedRef = useRef(false);
  const [lastJobId, setLastJobId] = useState<string>("");
  const [jobs, setJobs] = useState<JobInformationModel[]>([]);
  const [hasMoreJobs, setHasMoreJobs] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false);

  async function fetchJobs() {
    try {
      setLoading(true);
      const data = await FetchAllJobs(lastJobId);
      setJobs((jobs : JobInformationModel[]) => [...jobs, ...data.jobs]);
      setHasMoreJobs(data.nextExpectedId ? true : false);
      setLastJobId(data.nextExpectedId?.toString());
      setInitialized(true);
    } catch (err: unknown) {
      console.error(`error fetching jobs: `, err);

      setErrMessage(`Failed fetching data: ` + err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchJobs();
    }
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // if  item is intersecting, and more jobs is true, loading is false and initial data loaded correctly
      if (entries[0].isIntersecting && hasMoreJobs && !loading && initialized) {
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
  }, [hasMoreJobs, loading, initialized]);

  return (
    <div className="p-4">
      <SearchAndFilters />
      <button className="mb-4 text-2xl" onClick={openModal}>
        Add new Job
      </button>
      {jobs.length > 0 && (
        <div className="bg-secondary-backdrop">
          <JobDisplayList jobs={jobs}></JobDisplayList>
          <div ref={observerRef}></div>
        </div>
      )}
      {loading && <p> loading...</p>}
    </div>
  );
}
