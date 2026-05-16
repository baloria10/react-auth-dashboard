import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 12; // Products per page

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [skip]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (skip + limit < total) {
      setSkip(skip + limit);
    }
  };

  const handlePrevPage = () => {
    if (skip - limit >= 0) {
      setSkip(skip - limit);
    }
  };

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  if (loading && products.length === 0) {
    return (
      <div className={styles.loaderContainer}>
        <div className={`${styles.loader} loader`}></div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.productsContainer} animate-fade-in`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Explore Products</h1>
          <p className={styles.subtitle}>Showing {skip + 1}-{Math.min(skip + limit, total)} of {total} products</p>
        </div>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
            </div>
            <div className={styles.content}>
              <span className={styles.category}>{product.category}</span>
              <h2 className={styles.productTitle}>{product.title}</h2>
              <div className={styles.priceRow}>
                <span className={styles.price}>${product.price}</span>
                <div className={styles.rating}>
                  <Star size={16} fill="currentColor" />
                  <span>{product.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {total > limit && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn} 
            onClick={handlePrevPage} 
            disabled={skip === 0 || loading}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            className={styles.pageBtn} 
            onClick={handleNextPage} 
            disabled={skip + limit >= total || loading}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
