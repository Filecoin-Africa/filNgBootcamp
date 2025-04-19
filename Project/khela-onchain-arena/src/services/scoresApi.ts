
import axios from 'axios';

// Using a free sports API for demonstration
// In a production app, you would use a paid service with better data
const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export interface Team {
  id: string;
  name: string;
  logo: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: string;
  league: string;
  startTime: string;
  timeElapsed?: string;
}

export const fetchLiveScores = async (): Promise<Match[]> => {
  try {
    // Fetch live events
    const response = await axios.get(`${API_BASE_URL}/livescore.php`);
    
    if (!response.data.events) {
      return [];
    }

    return response.data.events.map((event: any) => ({
      id: event.idEvent,
      homeTeam: {
        id: event.idHomeTeam,
        name: event.strHomeTeam,
        logo: event.strHomeTeamBadge || '',
      },
      awayTeam: {
        id: event.idAwayTeam,
        name: event.strAwayTeam,
        logo: event.strAwayTeamBadge || '',
      },
      homeScore: parseInt(event.intHomeScore) || 0,
      awayScore: parseInt(event.intAwayScore) || 0,
      status: event.strStatus || 'Not Started',
      league: event.strLeague,
      startTime: event.strTime,
      timeElapsed: event.strTimeElapsed,
    }));
  } catch (error) {
    console.error('Error fetching live scores:', error);
    return [];
  }
};

// Fallback mock data for demonstration when API limits are reached
export const getMockLiveScores = (): Match[] => {
  return [
    {
      id: '1',
      homeTeam: {
        id: '101',
        name: 'Boston Celtics',
        logo: 'https://www.thesportsdb.com/images/media/team/badge/rxqspq1421680650.png',
      },
      awayTeam: {
        id: '102',
        name: 'LA Lakers',
        logo: 'https://www.thesportsdb.com/images/media/team/badge/xpswpq1421680755.png',
      },
      homeScore: 87,
      awayScore: 82,
      status: 'In Progress',
      league: 'NBA',
      startTime: '19:30',
      timeElapsed: '3rd Quarter',
    },
    {
      id: '2',
      homeTeam: {
        id: '103',
        name: 'Manchester United',
        logo: 'https://www.thesportsdb.com/images/media/team/badge/vpypqr1422037443.png',
      },
      awayTeam: {
        id: '104',
        name: 'Liverpool',
        logo: 'https://www.thesportsdb.com/images/media/team/badge/rtyxtr1421680713.png',
      },
      homeScore: 1,
      awayScore: 2,
      status: 'In Progress',
      league: 'Premier League',
      startTime: '15:00',
      timeElapsed: '70\'',
    },
    {
      id: '3',
      homeTeam: {
        id: '105',
        name: 'Kansas City Chiefs',
        logo: 'https://www.thesportsdb.com/images/media/team/badge/trtusv1421435081.png',
      },
      awayTeam: {
        id: '106',
        name: 'Buffalo Bills',
        logo: 'https://www.thesportsdb.com/images/media/team/badge/vvwrvr1421434116.png',
      },
      homeScore: 24,
      awayScore: 17,
      status: 'In Progress',
      league: 'NFL',
      startTime: '13:00',
      timeElapsed: '3rd Quarter',
    },
  ];
};
