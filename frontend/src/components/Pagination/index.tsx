import ReactPaginate from 'react-paginate';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import './styles.css';
type Props = {
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void; // função que recebe numero como argumento
  forcePage?: number;
};

const Pagination = ({ forcePage, pageCount, range, onChange }: Props) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount} // Quantidade Total de páginas
      pageRangeDisplayed={range} // Quantas bolinhas da paginação vão aparecer
      marginPagesDisplayed={1} // Quantas bolinas de paginação vão aparecer depois dos 3 pontos
      containerClassName="pagination-container" // classe do container que terá os elementos
      pageLinkClassName="pagination-item" //estilo de cada um dos links de paginação
      breakClassName="pagination-item" //estilo dos 3 pontos da paginação
      previousClassName="arrow-previous" // estilo da seta
      nextClassName="arrow-next" //estilo da seta
      activeLinkClassName="pagination-link-active" //estilo de quando estiver na página
      disabledClassName="arrow-inative" // estilo da seta quando não poder voltar ou avançar páginas
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
     
      previousLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon />
        </div>
      } //seta antes da paginação
      nextLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon />
        </div>
      } //seta depois da paginação
    />
  );
};
export default Pagination;
