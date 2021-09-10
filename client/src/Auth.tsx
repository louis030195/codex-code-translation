import React, { FC, FormEvent, useEffect, useState } from "react";

interface Props {
  authError: string;
  clearError: () => void;
}

export const loadCurrentUser = (): string | null => {
  return sessionStorage.getItem("user");
};

const UserForm: FC<{
  authError: string;
  onSetUser: (username: string) => void;
}> = ({ authError, onSetUser }) => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => setError(authError), [authError]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (userName.trim() === "") {
      setError("username can't be empty");
      return;
    }

    setError("");
    onSetUser(userName);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
      <div className="row">
        <div className="column column-20">
          <input
            className={error ? "error" : ""}
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ height: "2.8rem", marginBottom: 0 }}
          />
        </div>
        <div className="column">
          <button
            type="submit"
            className="button button-outline button-small"
            style={{ marginRight: "15px", marginBottom: 0 }}
          >
            Log in
          </button>
          <span className={error ? "error" : ""}>{error}</span>
        </div>
      </div>
    </form>
  );
};

export const Auth: FC<Props> = ({ authError, clearError }) => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = loadCurrentUser();
    if (user != null) {
      setCurrentUser(user);
    }
  }, []);

  const clearUser = () => {
    sessionStorage.clear();
    setCurrentUser("");
  };

  const setUser = (userName: string) => {
    sessionStorage.setItem("user", userName);
    clearError();
    setCurrentUser(userName);
  };

  return (
    <header>
      {currentUser ? (
        <div>
          <span>Hello {currentUser}</span>
          <button
            className="button button-clear button-small"
            style={{ marginBottom: 0 }}
            onClick={() => clearUser()}
          >
            Log out
          </button>
        </div>
      ) : (
        <UserForm authError={authError} onSetUser={setUser} />
      )}
    </header>
  );
};
