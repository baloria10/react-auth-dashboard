import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Package, Hexagon } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.brandSection}>
          <Link to="/" className={styles.logo}>
            <Hexagon className={styles.logoIcon} />
            <span className={styles.logoText}>Auth Demo</span>
          </Link>
        </div>

        <div className={styles.navLinks}>
          <Link
            to="/products"
            className={`${styles.navLink} ${location.pathname.includes('/products') ? styles.navLinkActive : ''}`}
          >
            <Package size={20} />
            <span className="hide-mobile">Products</span>
          </Link>
          <Link
            to="/profile"
            className={`${styles.navLink} ${location.pathname === '/profile' ? styles.navLinkActive : ''}`}
          >
            <User size={20} />
            <span className="hide-mobile">Profile</span>
          </Link>
        </div>

        <div className={styles.userSection}>
          <Link to="/profile" className={styles.userInfo}>
            <img src={user.image} alt={user.firstName} className={styles.avatar} />
            <span className={styles.userName}>{user.firstName} {user.lastName}</span>
          </Link>
          <button onClick={logout} className={styles.logoutBtn} aria-label="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
