import { Card, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteComment } from "../redux/commentSlice";

function CommentList({ comments }) {
  const dispatch = useDispatch();

  if (!comments || comments.length === 0) {
    return <Alert variant="info">Aucun commentaire pour le moment</Alert>;
  }

  return comments.map((comment) => (
    <Card key={comment.id} className="mt-2 conteneur">
      <Card.Body>
        <Card.Title>Note : {comment.note}</Card.Title>
        <Card.Text>{comment.texte}</Card.Text>
        <div className="d-flex justify-content-end">
          <Button variant="danger" onClick={() => dispatch(deleteComment(comment.id))}>
            Supprimer
          </Button>
        </div>
      </Card.Body>
    </Card>
  ));
}

export default CommentList;
