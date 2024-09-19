'use client'

import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { RiCloseLine } from "react-icons/ri"

import { ModalProps } from "./types"

const myCreatePortal = ReactDOM.createPortal as any;

const ModalContainer = ({
  show,
  closeModal,
  children
}: any) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!show) return null

  return mounted ? myCreatePortal(
    <div
      className="fixed top-0 left-0 w-full h-screen z-50 bg-neutral-100/50 dark:bg-neutral-900/50
      backdrop-blur-md flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="relative bg-border backdrop-blur rounded-2xl p-5 w-[90%] max-w-5xl max-h-[90%] pt-8 scrollbar
        overflow-y-auto shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky z-10 w-max h-0 left-full top-0">
          <button className="icon-btn" onClick={closeModal}>
            <RiCloseLine />
          </button>
        </div>

        {children}
      </div>
    </div>,
  document.querySelector('#modal')!) : null
}

const Modal = ({
  renderOpener,
  closeModal,
  showModal,
  renderChildren
}: ModalProps) => {

  return (
    <>
      
      <ModalContainer
        show={showModal}
        closeModal={closeModal}
      >
        {renderChildren(closeModal)}
      </ModalContainer>
    </>
  )
}

export default Modal
