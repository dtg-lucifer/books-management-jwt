import { useState } from "react";
import styles from "./auth.module.scss";
import { IUser } from "../../types/user.interface";
import { useMutation } from "react-query";
import { login, register } from "../../utils/api";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  page: "LOGIN" | "REG";
}

interface FormState {
  userName: string;
  password: string;
}

const Login = ({ page }: LoginProps) => {
  const navigate = useNavigate();

  const [body, setBody] = useState<FormState>({
    userName: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (body: FormState) => {
      if (page === "REG") {
        const { data } = await register<Record<string, string>>(body);
        return { data };
      }
      const { data } = await login<Record<string, string>>(body);
      return { data };
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("/books");
    },
    onError: (err: Error) => {
      setError("Please check your credentials properly.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!body.userName || !body.password) {
      setError("Both fields are required.");
      return;
    }

    mutate(body);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className={styles.main__wrapper}>
      {page === "LOGIN" ? (
        <section className={styles.login__container}>
          <div>
            <span className="block font-bold text-[#001220]">
              Log <span className="text-white">in</span>
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.input__wrapper}>
              <label htmlFor="userName">Username or email</label>
              <input
                type="text"
                value={body.userName}
                onChange={handleChange}
                name="userName"
                id="userName"
              />
            </div>
            <div className={styles.input__wrapper}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={body.password}
                onChange={handleChange}
                name="password"
                id="password"
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </section>
      ) : (
        <section className={styles.register__container}>
          <div>
            <span className="block font-bold text-[#001220]">
              Sign <span className="text-white">up</span>
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.input__wrapper}>
              <label htmlFor="userName">Username or email</label>
              <input
                type="text"
                value={body.userName}
                onChange={handleChange}
                name="userName"
                id="userName"
              />
            </div>
            <div className={styles.input__wrapper}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={body.password}
                onChange={handleChange}
                name="password"
                id="password"
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
        </section>
      )}
    </main>
  );
};

export default Login;
