import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

interface AvModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: any;
}

export function AvModal({ isOpen, onClose, title, children }: AvModalProps) {
  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDir="column"
          m="4"
          p="4"
          borderRadius="4"
          bg="gray.100"
          overflowY="scroll"
          overflowX="auto"
        >
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
