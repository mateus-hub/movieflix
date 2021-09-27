import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { requestBackendReview } from 'util/requests';

import './styles.css';

type Props = {
  movieId: string;
  insertReview: Function;
};

type ReviewData = {
  text: string;
  movieId: string;
};

const ReviewInputCard = ({ movieId, insertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReviewData>();

  const onSubmit = (formData: ReviewData) => {
    formData.movieId = movieId;
    requestBackendReview(formData).then(() => {
      setValue('text', ''); //Limpa entrada quando avaliação for submetida
      insertReview(); //Aciona o evento de atualização da lista
      toast.success('Avaliação salva com sucesso!');
    });
  };

  return (
    <div className="base-card coment-input-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          <input
            {...register('text', {
              required: 'Campo obrigatório',
            })}
            type="text"
            className={`form-control base-input ${
              errors.text ? 'is-invalid' : ''
            }`}
            placeholder="Deixe sua avaliação aqui"
            name="text"
          />
          <div className="invalid-feedback d-block">{errors.text?.message}</div>
          <button type="submit" className="btn search-button">
            Salvar avaliação
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewInputCard;
