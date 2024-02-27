import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

// Components
import LeaderboardCard from "../components/LeaderboardCard";

function Leaderboards() {
    const [games, setGames] = useState([]);

    const getGames = async () => {
        const { data } = await axios.get("/leaderboards/games");
        setGames(data.games);
    }

    useEffect(() => {
        getGames();
    }, []);

    const leaderboardCards = games.map((game) => {
        return <LeaderboardCard key={game.gameName} game={game} />
    });
    
    return (
        <Container fluid className="d-flex justify-content-center mt-5 col-md-12">
            {leaderboardCards}
        </Container>
    )
}

export default Leaderboards;