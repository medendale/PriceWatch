"use client";
import { Fragment } from 'react'
import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { set } from 'mongoose';
import Image from 'next/image';
import { addUserEmailToProduct } from '@/lib/actions';
interface Props {
    productId: string;

}

const Modal = ({productId}: props) => {
    let [isOpen, setIsOpen] = useState(true)
    const [isSubmiting, setIsSubmiting] = useState(false);
    const[email, setEmail] = useState('');
 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmiting(true);

        await addUserEmailToProduct(productId, email)

        setIsSubmiting(false);
        setEmail('');
        closeModal();
    }

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    return (
  <>
    <button type="button" className="btn"onClick={openModal}>
        Track
    </button>
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" onClose={closeModal}
    className="dialog-container">
        <div className='min-h-screen px-4 text-center'>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-0"
                leaveTo="opacity-1"
            >
                <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
            />
           

            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className='dialog-content'>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <div className='p-3 border border-gray-200 rounded-10'>
                                <Image 
                                    src="/assets/icons/logo.svg"
                                    alt="logo"
                                    width={28}
                                    height={28}
                                 />

                            </div>
                            <Image   
                                src="/assets/icons/x-close.svg"
                                alt="close"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                                onClick={closeModal}
                            />
                        </div>
                        <h4 className='dialog-head_text'> Stay updated on the prices of your favorite products</h4>
                        <p className='text-sm text-gray-500 mt-2'> Never miss on timely alerts</p>
                    </div>
                    <form className='flex flex-col mt-5' onSubmit={handleSubmit}>
                        <label htmlFor="email" className='text-sm font-medium text-gray-700'>
                            Email address
                        </label>
                        <div className='dialog-input_container'>
                            <Image
                                src="/assets/icons/mail.svg"
                                alt="mail"
                                width={18}
                                height={18}
                              />
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className='dialog-input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                        <button type="submit" className='dialog-btn'>
                            {isSubmiting ? 'Submiting...' : 'Track'}}
                        </button>
                    </form>
                </div>

            </Transition.Child>

        </div>

    </Dialog>

    </Transition>
    
  </>
    )
}  

export default Modal