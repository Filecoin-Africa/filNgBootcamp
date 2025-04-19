
import React, { useState, useEffect } from 'react';
import { fetchLiveScores, getMockLiveScores, Match } from '@/services/scoresApi';
import ScoreCard from '@/components/ScoreCard';
import { Loader2 } from 'lucide-react';

const LiveScores: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadScores = async () => {
    try {
      const data = await fetchLiveScores();
      
      // If API returns no data, use mock data for demonstration
      if (data.length === 0) {
        setMatches(getMockLiveScores());
      } else {
        setMatches(data);
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch live scores:', err);
      setError('Failed to load live scores. Using sample data instead.');
      setMatches(getMockLiveScores());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScores();
    
    // Set up auto-refresh every 60 seconds
    const intervalId = setInterval(loadScores, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Live Scores</h1>
        <button 
          onClick={loadScores}
          className="flex items-center gap-2 text-primary hover:text-primary/80"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span>Refresh</span>
          )}
        </button>
      </div>
      
      {error && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
          <p className="text-amber-700">{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading live scores...</span>
        </div>
      ) : matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <ScoreCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No live matches found at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default LiveScores;
