
import { Levi } from "../assets/images"
const ManageCard = ({ imgURL, customerName, title, feedback }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="font-palanquin  text-3xl font-bold  lg:max-w-lg">{title}</h2>
      <p className="font-palanquin info-text text-3xl font-bold  lg:max-w-lg">{customerName}</p>
      <img src={imgURL} alt="managers" className=" m-6 bg-blue-700 rounded-full object-contain w-[180px] h-[180px]" />
      <p className="mt-6 info-text max-w-sm text-center drop-shadow text-black">{feedback}</p>
    </div>
  )
}

export default ManageCard