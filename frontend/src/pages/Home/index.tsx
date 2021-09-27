import { ReactComponent as MainImage } from 'assets/images/Desenho.svg';
import Login from 'components/Login';

import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content-container">
        <h1>Avalie filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <div className="image-container">
          <MainImage />
        </div>
      </div>
      <div className="auth-form-container">
        <Login />
      </div>
    </div>
  );
};

export default Home;
