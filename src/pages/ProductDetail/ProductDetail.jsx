import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    fetchProductDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('Product not found');
      const data = await response.json();
      setProduct(data);
      setActiveImage(data.images[0] || data.thumbnail);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`container ${styles.errorContainer}`}>
        <p>{error || 'Something went wrong.'}</p>
        <Link to="/products" className={styles.backBtn} style={{ marginTop: '1rem' }}>
          <ArrowLeft size={18} /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.detailContainer} animate-fade-in`}>
      <Link to="/products" className={styles.backBtn}>
        <ArrowLeft size={18} /> Back to Products
      </Link>

      <div className={styles.productCard}>
        <div className={styles.imageGallery}>
          <div className={styles.mainImageWrapper}>
            <img src={activeImage} alt={product.title} className={styles.mainImage} />
          </div>
          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  className={`${styles.thumbnailWrapper} ${activeImage === img ? styles.active : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className={styles.thumbnail} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.brand}>{product.brand || product.category}</span>
          <h1 className={styles.title}>{product.title}</h1>
          
          <div className={styles.meta}>
            <div className={styles.rating}>
              <Star size={18} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
            
            <div className={`${styles.stock} ${product.stock < 10 ? styles.low : ''}`}>
              {product.stock < 10 ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.price}>${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className={styles.discount}>{product.discountPercentage}% OFF</span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          {product.tags && product.tags.length > 0 && (
            <div className={styles.tags}>
              {product.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          <button className={styles.actionBtn}>
            <ShoppingCart size={20} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
