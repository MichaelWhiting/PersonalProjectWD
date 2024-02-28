import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

// Components
import LeaderboardCard from "../components/LeaderboardCard";

const animStr = (i) => `fadeInAnimation ${1000}ms ease-out ${500 * (i + 1)}ms forwards`;

function Leaderboards() {
    const [games, setGames] = useState([]);

    const getGames = async () => {
        const { data } = await axios.get("/leaderboards/games");
        setGames(data.games);
    }

    useEffect(() => {
        getGames();
    }, []);

    const leaderboardCards = games.map((game, i) => {
        return <LeaderboardCard key={game.gameName} game={game} style={{animation: animStr(i)}}/>
    });
    
    return (
        <Container fluid className="d-flex justify-content-center mt-5 col-md-12 fade-in">
            {leaderboardCards}
        </Container>
    )
}

export default Leaderboards;