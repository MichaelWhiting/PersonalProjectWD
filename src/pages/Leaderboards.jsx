import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import c from "../classStrings.js";

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
        <div className="d-flex flex-column fade-in">
            <h1 style={{textAlign: "center", marginTop: 50}}>Leaderboards:</h1>
            <hr style={{width: "80%", alignSelf: "center"}}/>
            <Container fluid className="d-flex justify-content-center mt-1" style={{width: "80%"}}>
                {leaderboardCards}
            </Container>
        </div>
    )
}

export default Leaderboards;