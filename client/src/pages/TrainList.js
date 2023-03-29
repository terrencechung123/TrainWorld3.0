import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

const TrainList = () => {
    const [trains, setTrains] = useState([]);

    // useEffect(()=>{
    //     fetch("/trains").then((r)=>{
    //         if (r.ok){
    //             r.json().then((trains)=>setTrains(trains));
    //         }
    //     })
    // },[])
    useEffect(() => {
        fetch("/trains")
        .then((r) => r.json())
        .then(setTrains);
    }, []);


    function handleDeleteTrain(id) {
        fetch(`/trains/${id}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                setTrains((trains) =>
                trains.filter((train) => train.id !== id)
                );
            }
        });
    }

    return (
        <Wrapper>
        <h1 style={{ fontSize: "2rem", fontFamily: "'Press Start 2P', cursive" }}>Trains</h1>
            {trains.length > 0 ? (
                trains.map((train) => (
                    <Train key={train.id}>
                        <Box>
                            <h3>{"Train ID: "+train.id}</h3>
                            <h3>{"Name: "+train.title}</h3>
                            <h3>{train.description}</h3>
                            <Image src={train.image_url}/>
                            <div>
                            <Button onClick={() => handleDeleteTrain(train.id)}>
                                Delete train
                            </Button>
                            </div>
                        </Box>
                    </Train>
                ))
            ) : (
                    <>
                    <h3>No Trains Found</h3>
                    <Button as={Link} to="/new_train">
                        Make a New Train
                    </Button>
                    </>
                )}
        </Wrapper>
    );
}


const Wrapper = styled.section`
    max-width: 800px;
    margin: 40px auto;
    transform: translate(0, 7%);
`;



const Train = styled.article`
    margin-bottom: 24px;

`;

const Image = styled.img`
    width: 300px;
    height: 200px;
    object-fit: cover;
`;

export default TrainList