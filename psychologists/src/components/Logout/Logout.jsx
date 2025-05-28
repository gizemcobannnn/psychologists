import { createPortal } from "react-dom"

export default function Logout({closeModal}) {

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <button onClick={closeModal}>Logout</button>
    </div>,document.body
  )
}
