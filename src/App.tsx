import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layouts/Layout';
import SmoothScroll from './components/SmoothScroll';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <Router>
      <Layout>
        <SmoothScroll>
          <AnimatedRoutes />
        </SmoothScroll>
      </Layout>
    </Router>
  );
}

export default App;
