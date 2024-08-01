'use client'

import { useRef } from "react"
import { FaUpload } from "react-icons/fa";

function ImageUpload() {
    const ref = useRef<any>(null)

    const openFileBox = () => {
        ref.current.click()
    }
    return (
        <div className="border-2 border-dashed flex flex-col items-center  p-4 cursor-pointer" onClick={openFileBox}>
            <FaUpload size={40} />
            <p>Uploads Images</p>
            <input type="file" className="hidden cursor-pointer" ref={ref} />
        </div>
    )
}

export default ImageUpload