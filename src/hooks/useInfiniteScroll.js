// src/hooks/useInfiniteScroll.js
import { useEffect, useCallback } from 'react';

// This hook takes a callback function that should be executed when the user scrolls to the bottom.
// It also takes dependencies like isLoading and hasMore to prevent unwanted fetches.
function useInfiniteScroll({ callback, isLoading, hasMore }) {
  const handleScroll = useCallback(() => {
    // A buffer of 100px so the fetch triggers slightly before the user hits the absolute bottom.
    const buffer = 100;
    const isAtBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - buffer;

    // If we're at the bottom, not currently loading, and there are more items to fetch, run the callback.
    if (isAtBottom && !isLoading && hasMore) {
      callback();
    }
  }, [isLoading, hasMore, callback]);

  useEffect(() => {
    // Add the scroll event listener when the component mounts.
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener when the component unmounts.
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]); // The effect re-runs if the handleScroll function changes.
}

export default useInfiniteScroll;