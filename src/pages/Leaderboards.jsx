import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

// Components
import LeaderboardCard from "../components/LeaderboardCard";

const animStr = (i) => `fadeInAnimation ${1000}ms ease-out ${500 * (i + 1)}ms forwards`;

function Leaderboards() {
    const [games, setGames] = useState([]);

    const getGames = async () => {
        const { data } = await axios.get("/leaderboards/games"); // gets all of the game objects from the DB
        setGames(data.games); // updates the games state variable
    }

    useEffect(() => { // on initial render, get all of the games from the DB
        getGames();
    }, []);

    const leaderboardCards = games.map((game, i) => { // creates a LeaderboardCard component for each game
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