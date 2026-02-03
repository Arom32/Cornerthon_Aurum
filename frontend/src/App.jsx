import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './main-page/main-page.jsx';
import Mainoption from './main-option/main-option.jsx';
import Mainperformance from './main-performance/main-performance.jsx';
import Performanceconcert from './performance-concert/performance-concert.jsx';
import Performancemusical from './performance-musical/performance-musical.jsx';
import Performanceplayacting from './performance-playacting/performance-playacting.jsx';
import Performancefestival from './performance-fstival/performance-festival.jsx';
import Performancedisplay from './performance-display/performance-display.jsx';
import Communitymain from './community-main/community-main.jsx';
import Communityfree from './community-free/community-free.jsx';
import Communitydeal from './community-deal/community-deal.jsx';
import Writing from './writing/writing.jsx';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage/>}/>
        <Route path="/" element={<Mainoption/>}/>
        <Route path="/" element={<Mainperformance/>}/>
        <Route path="/" element={<Performanceconcert/>}/>
        <Route path="/" element={<Performancemusical/>}/>
        <Route path="/" element={<Performanceplayacting/>}/>
        <Route path="/" element={<Performancefestival/>}/>
        <Route path="/" element={<Performancedisplay/>}/>
        <Route path="/" element={<Communitymain/>}/>
        <Route path="/" element={<Communityfree/>}/>
        <Route path="/" element={<Communitydeal/>}/>
        <Route path="/" element={<Writing/>}/>
      </Routes>
    </Router>
  );
}
export default App;