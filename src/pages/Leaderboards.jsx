// import { requestGames } from "../reducers/leaderboardsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import LeaderboardCard from "../components/LeaderboardCard";
import axios from "axios";

function Leaderboards() {
    const loading = useSelector(state => state.leaderboards.loading);
    const games = useSelector(state => state.leaderboards.games);
    const dispatch = useDispatch();

    const getGames = async () => {
        await axios.get(`/leaderboards/games`)
        .then(res => {

            console.log(res.data.games)
            
            dispatch({
                type: "REQUEST_GAMES",
                payload: res.data.games
            })
        })
        }

    useEffect(() => {
        getGames()
        // dispatch(requestGames);
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