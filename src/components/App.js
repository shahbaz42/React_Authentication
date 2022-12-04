import Signup from './Signup';

function App() {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY)
  return <>
    <Signup />
  </>
}

export default App;