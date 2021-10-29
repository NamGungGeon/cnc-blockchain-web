import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Box, Button, Lorem } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import React, { useEffect, useState } from "react";

const withModal = (WrappedComponent) => {
  const Component = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modal, setModal] = useState({});
    useEffect(() => {
      if (!isOpen) {
        setModal({});
      }
    }, [isOpen]);

    const openModal = (header, body, footer) => {
      setModal({
        header,
        body,
        footer,
      });

      onOpen();
    };
    const closeModal = () => {
      onClose();
    };

    const combinedProps = {
      ...props,
      openModal,
      closeModal,
      isOpenModal: isOpen
    };

    return (
      <div>
        <WrappedComponent {...combinedProps} />
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{modal.header}</ModalHeader>
              <ModalCloseButton />

              <ModalBody>{modal.body}</ModalBody>

              <ModalFooter>
                {modal.footer ?? (
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    닫기
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </div>
    );
  };

  return Component;
};

export default withModal;
