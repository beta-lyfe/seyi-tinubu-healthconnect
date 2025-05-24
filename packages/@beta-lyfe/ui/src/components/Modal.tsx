import { Datepicker, Modal } from 'flowbite-react'
import { useState } from 'react'
import { Typography } from './typography'
import { Image, Plus, X } from 'lucide-react'
import { CloseButton } from '@headlessui/react'
import { Button } from './button'

export function ModalComponent({
  state: openModal,
  setState: setOpenModal
}: { state: boolean; setState: Function }) {
  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <div className="p-4 flex justify-center items-center">
            <Typography.ChatHeading>Add an appointment</Typography.ChatHeading>
            <CloseButton />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 p-4 ">
                <Image />
                <Typography.Heading>IMG.PNG</Typography.Heading>
              </div>
              <Button className="bg-primary">Add Image</Button>
            </div>
            <div className="p-4 pt-0 space-y-6">
              <form action="#">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Patient's Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Appointment date
                    </label>
                    <Datepicker />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reason
                  </label>
                  <input
                    id="message"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Reason"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    id="gender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  >
                    <option>Pending</option>
                    <option>Comfirmed</option>
                    <option>Cancelled</option>
                    <option>Completed</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            className="flex gap-4 rounded-full"
            onClick={() => setOpenModal(false)}
          >
            <Plus size={17} />
            <span>Add Appointment</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
