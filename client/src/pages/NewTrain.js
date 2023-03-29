import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewTrain() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [departureTime, setDepartureTime] = useState("");
//   const [arrivalTime, setArrivalTime] = useState("");
//   const [capacity, setCapacity] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const body = {
            title: title,
            image_url: image,
            description: description,
    //   origin: origin,
    //   destination: destination,
    //   departure_time: departureTime,
    //   arrival_time: arrivalTime,
    //   capacity: capacity,
        };
        fetch("/trains", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                history.push("/trains");
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

  return (
    <Wrapper>
      <WrapperChild>
        <h1 style={{ fontSize: "2rem", fontFamily: "'Press Start 2P', cursive" }}>Create Train</h1>
        <form onSubmit={handleSubmit}>
        <FormField>
  <Label htmlFor="title" style={{ color: "black", fontSize:"1.5em" }}>Title</Label>
  <Input
    type="text"
    id="title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
</FormField>
<FormField>
  <Label htmlFor="description" style={{ color: "black", fontSize:"1.5em" }}>Description</Label>
  <Input
    type="text"
    id="description"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
  />
</FormField>
<FormField>
  <Label htmlFor="image" style={{ color: "black", fontSize:"1.5em" }}>Image</Label>
  <Input
    type="text"
    id="image"
    value={image}
    onChange={(e)=>setImage(e.target.value)}
  />
</FormField>

          {/* <FormField>
            <Label htmlFor="origin">Origin</Label>
            <Input
              type="text"
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="destination">Destination</Label>
            <Input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="departureTime">Departure Time</Label>
            <Input
              type="datetime-local"
              id="departureTime"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <Input
              type="datetime-local"
              id="arrivalTime"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </FormField> */}
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Create Train"}
            </Button>
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

export default NewTrain;