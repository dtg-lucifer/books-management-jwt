import { useState } from "react";
import styles from "./auth.module.scss";
import { IUser } from "../../types/user.interface";
import { useMutation } from "react-query";
import { login } from "../../utils/api";

const Login = ({ page }: { page: "LOGIN" | "REG" }) => {
  const [body, setBody] = useState<{ userName: string; password: string }>({
    userName: "",
    password: "",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (body: { userName: string; password: string }) => {
      const { data } = await login<string>(body);
      return { data };
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(body);
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.input__wrapper}>
              <label htmlFor="userName">Username or email</label>
              <input
                type="text"
                value={body.userName}
                onChange={(e) =>
                  setBody((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
                name="userName"
              />
            </div>
            <div className={styles.input__wrapper}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={body.password}
                onChange={(e) =>
                  setBody((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                name="password"
              />
            </div>
            <button disabled={isLoading} type="submit">Login</button>
          </form>
        </section>
      ) : (
        <>
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Name" />
            <input type="userName" placeholder="UserName" />
            <input type="password" placeholder="Password" />
            <button type="submit">Register</button>
          </form>
        </>
      )}
    </main>
  );
};

export default Login;
