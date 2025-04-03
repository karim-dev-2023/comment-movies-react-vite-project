import { Container, Row, Col, Card, Form, Button } from "react-bootstrap/";
import "./App.css";
import bg from "./assets/bg-blackClover.jpg";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, deleteComment } from "./redux/commentSlice";
import { selectComment } from "./redux/selectors";

function App() {
  const dispatch = useDispatch();

  const [texte, setTexte] = useState("");
  const [note, setNote] = useState("");

  const comments = useSelector(selectComment);

  const handleAddTodo = () => {
    dispatch(addComment({ note, texte }));
    setTexte("");
    setNote("");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center mb-5"
    >
      <Row>
        <Col>
          <Card className="mt-5">
            <Card.Img variant="top" src={bg} className="imageCard" />
            <Card.Body>
              <Card.Title>Black Clover</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Sortie le :{" "}
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Text>Note Moyenne</Card.Text>
            </Card.Body>
          </Card>
          <h1 className="mt-2">Commentaires</h1>

          {/* Champ ajouter un commentaire */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ajouter un commentaire</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
            />
          </Form.Group>

          {/* Champ note */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Note</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            >
              <option>Séléctionner une note</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>

          {/* Champ CGU */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlCheckBox">
            <Form.Check // prettier-ignore
              type="checkbox"
              label="J'accepte les conditions générales"
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mb-2"
            onClick={handleAddTodo}
          >
            Ajouter
          </Button>

          {comments.map((comment) => (
            <Card key={comment.id} className="mt-2">
              <Card.Body>
                <Card.Title> Note : {comment.note}</Card.Title>
                <Card.Text>{comment.texte}</Card.Text>
                <div className="d-flex justify-content-end">
                  <Button variant="danger"  onClick={() => dispatch(deleteComment(comment.id))}>
                    Supprimer
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
