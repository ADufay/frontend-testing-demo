import { FC, FormEventHandler, useEffect, useState } from 'react';
import './App.css';
import { getUsers } from './core/users/usecases/getUsers';
import { User } from './core/users/models/user.model';
import { sendMessage } from './core/users/usecases/sendMessage';

const App: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
    })();
  }, []);

  const handleOnClickUser = (user: User): void => {
    if (user.email === selectedUser?.email) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendMessage(selectedUser?.email, message);
  };

  return (
    <main>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.email}>
              <button
                data-testid={`select-user-${user.email}`}
                aria-label={`Cliquer pour envoyer un message à ${user.email}`}
                style={{ backgroundColor: user.email !== selectedUser?.email ? '#f9f9f9' : '#e1e1e1', width: '100%' }}
                onClick={() => handleOnClickUser(user)}
              >
                <p>
                  <span className="bold">Prénom:</span> {user.firstname}
                </p>
                <p>
                  <span className="bold">Nom:</span> {user.lastname}
                </p>
                <p>
                  <span className="bold">Email:</span> {user.email}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      {selectedUser && (
        <>
          <h2>Envoyez un message à {selectedUser.firstname}:</h2>
          <form className="form" onSubmit={handleOnSubmit}>
            <label htmlFor="message">Entrez votre message:</label>
            <textarea
              data-testid="input"
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Envoyez le message</button>
          </form>
        </>
      )}
    </main>
  );
};

export default App;
