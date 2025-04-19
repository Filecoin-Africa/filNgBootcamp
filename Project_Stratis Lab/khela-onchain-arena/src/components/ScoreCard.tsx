
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Match } from '@/services/scoresApi';

interface ScoreCardProps {
  match: Match;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ match }) => {
  const isLive = match.status.toLowerCase().includes('progress');
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {match.league}
          </span>
          <Badge 
            variant={isLive ? "destructive" : "outline"}
            className={isLive ? "animate-pulse-slow" : ""}
          >
            {isLive ? "LIVE" : match.status}
          </Badge>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {match.homeTeam.logo && (
                <img
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  className="w-6 h-6 object-contain"
                />
              )}
              <span className="font-medium">{match.homeTeam.name}</span>
            </div>
            <span className="text-xl font-bold">{match.homeScore}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {match.awayTeam.logo && (
                <img
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  className="w-6 h-6 object-contain"
                />
              )}
              <span className="font-medium">{match.awayTeam.name}</span>
            </div>
            <span className="text-xl font-bold">{match.awayScore}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
          <span>{match.startTime}</span>
          {match.timeElapsed && <span>{match.timeElapsed}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
