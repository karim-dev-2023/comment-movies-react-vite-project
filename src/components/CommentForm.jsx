import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  commentaire: yup
    .string()
    .required("Le message est requis")
    .max(500, "Max 500 caractères"),
  notes: yup
    .string()
    .oneOf(["1", "2", "3", "4", "5"], "La note est invalide")
    .required("La note est requise"),
  cgu: yup.boolean().oneOf([true], "Vous devez accepter les conditions générales"),
});

function CommentForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(); // vide les champs après soumission
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Form.Group className="mb-3" controlId="commentaire">
        <Form.Label>Ajouter un commentaire</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register("commentaire")}
          isInvalid={!!errors.commentaire}
        />
        <Form.Control.Feedback type="invalid">
          {errors.commentaire?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="notes">
        <Form.Label>Note</Form.Label>
        <Form.Select {...register("notes")} isInvalid={!!errors.notes}>
          <option value="">Sélectionner une note</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </Form.Select>
        <div className="invalid-feedback d-block">
          {errors.notes?.message}
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="cgu">
        <Form.Check
          type="checkbox"
          label="J'accepte les conditions générales"
          {...register("cgu")}
          isInvalid={!!errors.cgu}
        />
         <div className="invalid-feedback d-block">
          {errors.cgu?.message}
        </div>
      </Form.Group>

      <Button type="submit" variant="primary" className="mb-2">
        Ajouter
      </Button>
    </Form>
  );
}

export default CommentForm;
