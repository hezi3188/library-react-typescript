import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReadersMangement from './readers/readersMangement';
import AuthorsMangement from './authors/authorsMangement';
import BooksMangement from './books/booksMangement';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ReadersMangement />} />
        <Route path='authors/*' element={<AuthorsMangement />} />
        <Route path='books/*' element={<BooksMangement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
