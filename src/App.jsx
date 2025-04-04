import { Container, Row, Col } from "react-bootstrap/";
import "./App.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "./redux/commentSlice";
import { selectComment } from "./redux/commentSlice";

import MovieCard from "./components/MovieCard.jsx";
import CommentForm from "./components/CommentForm.jsx";
import CommentList from "./components/CommentList.jsx";

function App() {
  const dispatch = useDispatch();
  const comments = useSelector(selectComment);

  const [apiMovies, setApi] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonfakery.com/movies/random/1")
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setApi(data[0]); // On prend le 1er élément du tableau
      })
      
      .catch((error) => {
        setError(
          "Une erreur s'est produite lors du chargement. Réessayez plus tard."
        );
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddComment = (data) => {
    dispatch(addComment({ note: data.notes, texte: data.commentaire }));
  };

  if (error) return <p>Erreur : {error}</p>;
  if (loading) return <p>Chargement...</p>;

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center mb-5 conteneur"
    >
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {apiMovies && <MovieCard key={apiMovies.id} movie={apiMovies} />}
          <h1 className="mt-2">Commentaires</h1>
          <CommentForm onSubmit={handleAddComment} />
          <CommentList comments={comments} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
