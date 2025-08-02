import { CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type PropsModal = {
    title: string;
    stateModal: boolean;
    setStateModal: Dispatch<SetStateAction<boolean>> ;
    trigger?: ReactNode;
}
export default function Modal({ children, title, trigger, stateModal, setStateModal, ...props }:PropsModal & Dialog.RootProps) {

  return (
    <Dialog.Root scrollBehavior="inside" placement="center" motionPreset="slide-in-bottom" open={stateModal} onOpenChange={(e) => setStateModal(e.open)} {...props}>
      {trigger?(
        <Dialog.Trigger asChild>
            {trigger}
        </Dialog.Trigger>
      ):<></>
      }
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius='15px'>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
                {children}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
