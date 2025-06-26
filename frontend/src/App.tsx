import SearchBar from './searchBar'
import {Routes, Route} from "react-router-dom"
import NavBar from './navBar'

function App() {
  return (
    <>
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/searchBar" element={<SearchBar />} />
      </Routes>

    </>
  )
}

export default App
