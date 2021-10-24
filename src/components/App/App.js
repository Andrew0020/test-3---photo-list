import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header />

      <div className="app-content">
        <Content />
      </div>

      <Footer />
    </div>
  );
}

export default App;
