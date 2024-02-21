// import { requestGames } from "../reducers/leaderboardsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

import LeaderboardCard from "../components/LeaderboardCard";
import axios from "axios";

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