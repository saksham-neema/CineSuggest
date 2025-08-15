// src/hooks/useInfiniteScroll.js
import { useEffect, useCallback } from 'react';

// This hook takes a function ('callback') to run when the user scrolls to the bottom.
// It also takes dependencies to prevent fetching when it's already loading or there are no more results.
function useInfiniteScroll({ callback, isLoading, hasMore }) {
  const handleScroll = useCallback(() => {
    // We use a 100px buffer so the new content starts loading just before the user hits the absolute bottom.
    const buffer = 100;
    const isAtBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - buffer;

    // If the user is at the bottom, we are not already loading, AND there are more results to fetch...
    if (isAtBottom && !isLoading && hasMore) {
      callback(); // ...then run the function to fetch the next page.
    }
  }, [isLoading, hasMore, callback]);

  useEffect(() => {
    // Add the scroll event listener to the window when the component mounts.
    window.addEventListener('scroll', handleScroll);
    
    // It's crucial to clean up and remove the event listener when the component unmounts
    // to prevent memory leaks.
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]); // The effect will re-run if the handleScroll function ever changes.
}

export default useInfiniteScroll;