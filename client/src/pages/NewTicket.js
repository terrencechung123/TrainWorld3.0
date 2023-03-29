import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewTicket({ user }) {
  const [price, setPrice] = useState("");
  const [trainId, setTrainId] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    Promise.all([
      fetch(`/trains/${trainId}`).then((r) => r.json()),
      fetch(`/users/${userId}`).then((r) => r.json()),
    ])
      .then(([trainData, userData]) => {
        const body = {
          price: price,
          train_id: trainId,
          user_id: userId,
        };
        return fetch("/tickets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          history.push("/tickets");
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <Heading>Create Ticket</Heading>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="price" style={{ color: "black", fontSize:"1.5em" }}>Price</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="trainId" style={{ color: "black", fontSize:"1.5em" }}>Train ID</Label>
            <Input
              type="number"
              id="trainId"
              value={trainId}
              onChange={(e) => setTrainId(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="userId" style={{ color: "black", fontSize:"1.5em" }}>User ID</Label>
            <Input
              type="number"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </FormField>
          <FormField>
            <StyledButton type="submit" isLoading={isLoading}>Submit Ticket</StyledButton>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WrapperChild = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -130%);
    width: 400px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-family: 'Press Start 2P', cursive;
  white-space: nowrap;
`;

const StyledButton = styled(Button)`
  ${({ isLoading }) => isLoading && `
    cursor: not-allowed;
    opacity: 0.7;
  `}
`;

export default NewTicket;