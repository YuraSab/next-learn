import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
            <LoginForm />
        </div>
    );
}