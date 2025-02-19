import { MantineProvider, Button, Container, Title, TextInput, Text, Card, Image } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  return <Title align="center">Üdv az Eszközkezelőben!</Title>;
}

function TipusList() {
  const [tipusok, setTipusok] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5001/api/Tipusok")
      .then(response => setTipusok(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Title align="center" mb="lg">Eszköztípusok</Title>
      {tipusok.length === 0 ? (
        <Text>Nincsenek elérhető eszközök.</Text>
      ) : (
        tipusok.map(tipus => (
          <Card key={tipus.id} shadow="sm" padding="lg" mb="md" withBorder>
            <Card.Section>
            <Image src={`/images/${tipus.kepek}`} alt={tipus.megnevezes} height={160} />

            </Card.Section>
            <Title order={3} mt="sm">{tipus.megnevezes}</Title>
            <Text size="sm" mt="xs">{tipus.leiras}</Text>
          </Card>
        ))
      )}
    </Container>
  );
}

function UjTipusFelvitel() {
  const [nev, setNev] = useState("");

  const handleSubmit = () => {
    axios.post("https://localhost:5001/api/UjTipusok", { nev })
      .then(() => alert("Sikeresen hozzáadva!"))
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Title>Új eszköztípus</Title>
      <TextInput label="Név" value={nev} onChange={(e) => setNev(e.target.value)} />
      <Button onClick={handleSubmit} mt="sm">Hozzáadás</Button>
    </Container>
  );
}

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Container>
          <Button component={Link} to="/" mr="sm">Főoldal</Button>
          <Button component={Link} to="/tipusok" mr="sm">Típusok</Button>
          <Button component={Link} to="/uj-tipus">Új típus</Button>
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tipusok" element={<TipusList />} />
            <Route path="/uj-tipus" element={<UjTipusFelvitel />} />
          </Routes>
        </Container>
      </Router>
    </MantineProvider>
  );
}
