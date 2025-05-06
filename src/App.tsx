import Header from "./Header"
import PetForm from "./PetForm"


const App = () => {
  return (
    <>
    <div  className="top-0 w-full bg-slate-900 text-white flex h-10 items-center">
      <Header/>
    </div>
    <div className="mt-5">
      <PetForm/>
    </div>
    </>
  )
}

export default App