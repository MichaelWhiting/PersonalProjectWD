import { useEffect, useState } from "react";
import axios from "axios";

// Components
import LeaderboardCard from "../components/LeaderboardCard";

function Leaderboards() {
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState([]);

    const getGames = async () => {
        const { data } = await axios.get("/leaderboards/games");
        setGames(data.games);
        console.log(data.games);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        getGames();
    }, []);

    const leaderboardCards = games.map((game) => {
        return <LeaderboardCard key={game.gameName} game={game} />
    });
    
    return (
        <>
            {loading ? <h1>Loading</h1> : <span>{leaderboardCards}</span>}
        </>
    )
}

export default Leaderboards;