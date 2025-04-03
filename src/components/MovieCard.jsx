import { Card } from "react-bootstrap";

function MovieCard({ movie }) {
  return (
    <Card className="mt-5 cardApi">
      <Card.Img variant="top" src={movie.backdrop_path} className="imageCard" />
      <Card.Body>
        <Card.Title>{movie.original_title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Sortie le : {movie.release_date}
        </Card.Subtitle>
        <Card.Text>{movie.overview}</Card.Text>
        <Card.Text>
          Note moyenne : {movie.vote_average} ({movie.vote_count})
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
