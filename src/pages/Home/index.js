import { useState } from "react";
import { Header } from "../../components/Header";
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';
import './style.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser && newUser.name){
      const { avatar_url, name, bio } = newUser;
      setCurrentUser({ avatar_url, name, bio });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeholder="@username" />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img src={currentUser.avatar_url} className="profile" alt="profile"/>
              </div>
              <h3>{currentUser.name}</h3>
              <span>{currentUser.bio}</span>
              <hr />
            </>
          ) : null}

          {repos?.length ? (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map((repo, index) => (
                <div key={index}>
                  <ItemList title={repo.name} description={repo.description} />
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <div className="notfound">
              <h4>Nenhum repositório encontrado.</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
