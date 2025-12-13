"use client";

import type { JobInformationModel } from "@/types";
import { useEffect, useRef, useState } from "react";
import JobDisplayList from "./components/JobDisplayList";
import SearchAndFilters from "./components/SearchAndFilters";
import FetchAllJobs from "./actions/FetchAllJobs";
import { useModal } from "./utils/context/AddModalContext";
import Link from "next/link";
import { useUser } from "./utils/context/UserDataContext";

export default function Home() {
  const { openModal } = useModal();
  const user = useUser();
  const observerRef = useRef<HTMLDivElement>(null);
  const queryActiveRef = useRef(false);
  const hasFetchedRef = useRef(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [lastJobId, setLastJobId] = useState<string>("");
  const [jobs, setJobs] = useState<JobInformationModel[]>([]);
  const [hasMoreJobs, setHasMoreJobs] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false);


  async function fetchJobs() {
    try {
      setLoading(true);
      const data = await FetchAllJobs(lastJobId, user.userData.user_id);
      setJobs((jobs: JobInformationModel[]) => [...jobs, ...data.jobs]);
      setHasMoreJobs(data.nextExpectedId ? true : false);
      setTotalResults(data.total);
      setLastJobId(data.nextExpectedId?.toString());
      setInitialized(true);
    } catch (err: unknown) {
      console.error(`error fetching jobs: `, err);
      setErrMessage(`Failed fetching data: ` + err);
    } finally {
      setLoading(false);
    }
  }
  // set Jobs from inside components
  function handleSetJobs(j: JobInformationModel[]) {
    queryActiveRef.current = true;
    setJobs(j);
    setTotalResults(j.length);
  }
  // initial fetch
  useEffect(() => {
    if (queryActiveRef.current) return;
    if (!hasFetchedRef.current && user.initialized) {
      hasFetchedRef.current = true;
      fetchJobs();
    }
  }, [user.initialized]);
  // loading more was we scroll down and get the invisible div on screen
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (queryActiveRef.current) return;
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
    <div className="p-4 flex flex-col">
      <SearchAndFilters handleSetJobs={handleSetJobs} totalResults={totalResults}/>
     {user.userData.user_id && 
      <button className="mb-4 text-2xl text-start" onClick={openModal}>
        Add new Job
      </button>}
      {jobs.length > 0 ? (
        <div className="">
          <JobDisplayList jobs={jobs}></JobDisplayList>
          <div ref={observerRef}></div>
        </div>
      ) : user.userData.user_id !== '' ? <p>No applications to display</p>:(<a href={"/sign-in"}>Click here to Register</a>)}
      {loading && <p> loading...</p>}
    </div>
  );
}
