// api/proxy.js
export default async function handler(request, response) {
  // Get the API Key from Vercel's environment variables
  const apiKey = process.env.VITE_TMDB_API_KEY;
  
  // Take the search parameters from the incoming request (e.g., ?query=...)
  const searchParams = new URL(request.url, `https://${request.headers.host}`).search;
  
  // The TMDb endpoint we want to hit
  const tmdbUrl = `https://api.themoviedb.org/3/discover/movie${searchParams}&api_key=${apiKey}`;

  try {
    const tmdbResponse = await fetch(tmdbUrl);
    const data = await tmdbResponse.json();
    
    // Send the response from TMDb back to our React app
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch data from TMDb' });
  }
}