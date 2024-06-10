import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";

interface IModalDialogProps {
  children: React.JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function ModalDialog({
  children,
  isOpen,
  onClose,
  title,
}: IModalDialogProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          color={"white"}
          bgColor={"rgba(29, 29, 29, 1)"}
          pb={"20px"}
          mx={{base:'20px', md: "0"}}
        >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          {/* <ModalFooter>
            <Button
              size={"sm"}
              bgColor={"white"}
              color={"black"}
              colorScheme="green"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
