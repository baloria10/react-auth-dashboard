import { useAuth } from '../../context/AuthContext';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import styles from './Profile.module.css';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={`container ${styles.profileContainer} animate-fade-in`}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <img src={user.image} alt={user.firstName} className={styles.avatar} />
          <div className={styles.roleBadge}>{user.role || 'User'}</div>
        </div>
        
        <div className={styles.infoSection}>
          <div className={styles.header}>
            <h1 className={styles.name}>{user.firstName} {user.lastName}</h1>
            <span className={styles.username}>@{user.username}</span>
          </div>
          
          <div className={styles.grid}>
            <div className={styles.infoGroup}>
              <Mail className={styles.icon} size={24} />
              <div className={styles.details}>
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
            </div>
            
            <div className={styles.infoGroup}>
              <Phone className={styles.icon} size={24} />
              <div className={styles.details}>
                <label>Phone Number</label>
                <p>{user.phone}</p>
              </div>
            </div>
            
            <div className={styles.infoGroup}>
              <Calendar className={styles.icon} size={24} />
              <div className={styles.details}>
                <label>Birth Date</label>
                <p>{user.birthDate}</p>
              </div>
            </div>
            
            <div className={styles.infoGroup}>
              <MapPin className={styles.icon} size={24} />
              <div className={styles.details}>
                <label>Location</label>
                <p>{user.address?.city}, {user.address?.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
