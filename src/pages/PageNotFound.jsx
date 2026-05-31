import { Link } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound() {
  return (
    <div className="PageNotFound">
      <h2>404 — page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <p><Link to="/">← Back to home</Link></p>
    </div>
  );
}