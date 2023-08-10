import "./LoginForm.css"
export default function RegistrationForm() {
    return(
        <>
            <p className={"title"}>Registration form</p>

            <form className={"RegForm"}>
                <input type={"text"} />
                <input type={"email"} />
                <input type={"password"} />
                <input type={"submit"} style={{ background: "#a1eafb" }} />
            </form>
        </>
    )
}