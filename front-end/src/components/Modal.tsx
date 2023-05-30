import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface ModalProps extends React.PropsWithChildren {
  closeModal: () => void
}

export default function Modal({ closeModal, children }: ModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="flex flex-col bg-dark_theme rounded-lg p-8 relative gap-4"
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          exit={{ x: -1000 }}
          transition={{ duration: 0.3 }}
        >
          {children}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
