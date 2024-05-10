import React from 'react'
import { MdOutlineViewTimeline } from "react-icons/md";


const ProjectsNavbar = () => {
  return (
    
    <div className=' flex  justify-between items-center pl-9 lg:pl-4 pr-5  w-full flex-row  h-16 shadow-md'>
        <div>Projects</div>
        <div className='flex space-x-3'>
            <button className="" onClick={()=>document.getElementById('my_modal_4').showModal()}>Add Project</button> 
            <div>
                <div  className='md:hidden'>
                                    <MdOutlineViewTimeline size={25} />

                </div>

                <span className='hidden md:block'>View timeline
                    </span>

            </div>
        </div>

        <dialog id="my_modal_4" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>
       
    </div>
  )
}

export default ProjectsNavbar