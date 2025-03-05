import { useEffect, useState } from "react";
import "./App.css";

function validate(value: string, reg: RegExp) {
    if (reg.test(value)) {
        return true;
    }
    return false;
}

const regExp = {
    name: /^[a-zA-Z]{3,10}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
}; ``


function App() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [conditions, setConditions] = useState(false);
    const [error, setError] = useState<any>({
        name: false,
        email: false,
        password: false,
        repeatPassword: false,
        conditions: false,
    });

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const fm = new FormData(event.currentTarget);
        const fmConditions = fm.has("conditions");


        const newErrors = {
            name: name.trim() === "",
            email: email.trim() === "",
            password: password.trim() === "",
            repeatPassword: repeatPassword.trim() === "",
            conditions: !fmConditions,

        };

        setError(newErrors);



        if (Object.values(newErrors).includes(true)) {
            return;
        }

        const user = {};
        fm.forEach((val, key) => (user[key] = val));

        console.log(user);
    }

    useEffect(() => {
        if (name !== "") {
            setError({ ...error, name: !validate(name, regExp.name) });
        }
    }, [name]);
    useEffect(() => {
        if (email !== "") {
            setError({ ...error, email: !validate(email, regExp.email) });
        }
    }, [email]);

    useEffect(() => {
        if (password !== "") {
            setError({
                ...error,
                password: !validate(password, regExp.password),
            });
        }
    }, [password]);


    useEffect(() => {
        if (repeatPassword !== "") {
            setError({
                ...error,
                repeatPassword: repeatPassword !== password || !validate(repeatPassword, regExp.password),
            });
        }
    }, [repeatPassword, password]);
    useEffect(() => {
        if (conditions !== true) {
            setError({
                ...error,
                conditions: conditions !== true,
            });
        }
    }, [repeatPassword, password]);

    return (
        <div className="flex justify-center pt-20">
            <form onSubmit={submit} className="flex flex-col justify-center gap-3 ">
                <h1 className="text-center font-bold italic">Sign in</h1>
                <input className="border-1 border-gray-500 pl-2 "
                    onKeyUp={(e: any) => setName(e.target.value)}
                    type="text"
                    placeholder="name"
                    name="name"
                />
                {error.name && (
                    <span className="text-red-500">invalid name</span>
                )}
                <input className="border-1 border-gray-500 pl-2"
                    onKeyUp={(e: any) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email@exemple.com"
                    name="email"
                />
                {error.email && (
                    <span className="text-red-500">invalid email</span>
                )}
                <input className="border-1 border-gray-500 pl-2"
                    onKeyUp={(e: any) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    name="password"
                />
                {error.password && (
                    <span className="text-red-500">invalid password</span>
                )}
                <input className="border-1 border-gray-500 pl-2"
                    onKeyUp={(e: any) => setRepeatPassword(e.target.value)}
                    type="password"
                    placeholder="repeatPassword"
                    name="repeatPassword"
                />
                {error.repeatPassword && (
                    <span className="text-red-500 pl-2">invalid repeat password</span>
                )}

                <div className="text-center">
                    <input className="border-1 border-gray-500"
                        onKeyUp={(e: any) => setConditions(e.target.value)}
                        type="checkbox"
                        name="conditions"
                    /> <a href="#" className="text-blue-600 underline"> Я принимаю <br /> Условия использования. <br /></a>
                    {error.conditions && (
                        <span className="text-red-500 pl-2 text-center">Вы должны <br /> принять условия!</span>
                    )}
                </div>

                <button className="border-1 border-gray-500 pl-2 cursor-pointer ">Send</button>
            </form>
        </div>
    );
}

export default App;
