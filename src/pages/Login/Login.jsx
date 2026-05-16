import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Fetch all users to validate locally as requested
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users?limit=0`);
      const data = await response.json();

      const validUser = data.users.find(
        (u) => u.email === email && u.password === password
      );

      if (validUser) {
        login(validUser);
        navigate('/'); // Redirect to dashboard
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`${styles.loginBox} animate-fade-in`}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="emily.johnson@x.dummyjson.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} />
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className="loader"></span>
            ) : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        
        <div className={styles.hint}>
          Hint: Use <strong>emily.johnson@x.dummyjson.com</strong> and <strong>emilyspass</strong>
        </div>
      </div>
    </div>
  );
};

export default Login;
