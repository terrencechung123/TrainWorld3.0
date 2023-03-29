import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
function UserList() {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetch("/users").then((r)=>{
            if (r.ok){
                r.json().then((users)=>setUsers(users));
            }
        })
        },[])
    return (
        <Wrapper>
        <h1 style={{ fontSize: "2rem", fontFamily: "'Press Start 2P', cursive" }}>Users</h1>
            {users.length > 0 ? (
                users.map((user) => (
                <User key={user.id}>
                    <Box>
                    <h3>{"User ID: "+user.id}</h3>
                    <h3>{"Name: "+user.username}</h3>
                    <Image src={user.image_url}/>
                    <h3>{"Bio: "+user.bio}</h3>
                    {/* <h2>{"User Train: "+user.train}</h2> */}
                    {/* <h2>{"User: "+user.ticket}</h2>
                    <ReactMarkdown>{user.description}</ReactMarkdown> */}
                    </Box>
                </User>
                ))
            ) : (
                <>
                <h3>No Users Found</h3>
                <Button as={Link} to="/tickets">
                    Go home
                </Button>
                </>
            )}
            </Wrapper>
        );
}
const Wrapper = styled.section`
    max-width: 800px;
    margin: 40px auto;
    transform: translate(0, 3%);
`;
const User = styled.article`
    margin-bottom: 24px;
`;

const Image = styled.img`
    width: 300px;
    height: 200px;
    object-fit: cover;
`;

export default UserList;