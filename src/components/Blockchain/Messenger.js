import React, { useEffect, useState } from "react";
import { useNetwork } from "../../hooks/useNetwork";
import { Box, Button, VStack } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import withModal from "../../hoc/withModal";
import MsgMaker from "./MsgMaker";
import { Badge, Divider, HStack, Text } from "@chakra-ui/layout";
import keypair from "../../mobx/keypair";
import { Tag } from "@chakra-ui/tag";

const Messenger = ({ openModal, closeModal }) => {
  const [readMsgs, setReadMsgs] = useState(
    () => localStorage.getItem("readMsgs") ?? []
  );
  useEffect(() => {
    localStorage.setItem("readMsgs", readMsgs);
  }, [readMsgs]);

  const kp = keypair.value;
  const openMessageMaker = toAddr => {
    openModal(
      "메시지 작성",
      <MsgMaker onDismiss={closeModal} toAddr={toAddr} />,
      <div />
    );
  };
  const openMessageDetail = msg => {
    const { id, time, fromAddr, toAddr, message } = msg;
    const isRead = readMsgs.indexOf(id) !== -1;
    if (!isRead) {
      setReadMsgs([...readMsgs, id]);
    }
    openModal(
      "받은 메시지",
      <VStack spacing={4}>
        <Box width={"100%"}>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme="green"
            width={"100%"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            Time
          </Badge>
          <br />
          {time.toString()}
        </Box>
        <Box width={"100%"}>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme="green"
            width={"100%"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            From
          </Badge>
          <br />
          {fromAddr}
        </Box>
        <Box width={"100%"}>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme="green"
            width={"100%"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            Message
          </Badge>
          {message}
        </Box>
      </VStack>,
      <HStack justify={"flex-end"}>
        <Button colorScheme={"blue"} onClick={() => openMessageMaker(fromAddr)}>
          답장
        </Button>
        <Button onClick={closeModal}>닫기</Button>
      </HStack>
    );
  };
  const myMessages = [];
  const [network] = useNetwork();
  network.blockchain.chain.forEach((block, idx) => {
    if (idx === 0) return;
    const txs = block.transactions;
    txs.forEach(tx => {
      if (tx.payload?.op === "message" && tx.toAddr === kp.getPublic("hex")) {
        myMessages.push({
          fromAddr: tx.fromAddr,
          toAddr: tx.toAddr,
          message: tx.payload.data,
          id: tx.signiture,
          time: new Date(tx.timestamp)
        });
      }
    });
  });

  return (
    <VStack spacing={4} divider={<Divider orientation={"horizontal"} />}>
      <HStack justify={"flex-end"} width={"100%"}>
        <IconButton icon={<AddIcon />} onClick={() => openMessageMaker()} />
      </HStack>
      {myMessages.length === 0 && <Box width={"100%"}>메시지가 없습니다</Box>}
      {myMessages.reverse().map(msg => {
        const { id, time, fromAddr, toAddr, message } = msg;
        const isRead = readMsgs.indexOf(id) !== -1;
        return (
          <Box
            key={id}
            width={"100%"}
            padding={2}
            borderRadius={"lg"}
            colorScheme={"teal"}
            style={{
              transition: "0.3s background",
              cursor: "pointer"
            }}
            _hover={{
              background: "teal.600"
            }}
            onClick={() => openMessageDetail(msg)}
          >
            <Box>
              <Tag maxWidth={"100%"} colorScheme={!isRead && "green"}>
                Time
              </Tag>
            </Box>
            <Text>{time.toString()}</Text>
            <br />
            <Box>
              <Tag maxWidth={"100%"} colorScheme={!isRead && "green"}>
                From
              </Tag>
            </Box>
            <Text>{fromAddr}</Text>
            <br />
            <Box>
              <Tag maxWidth={"100%"} colorScheme={!isRead && "green"}>
                Content
              </Tag>
            </Box>
            <Text>{message}</Text>
          </Box>
        );
      })}
    </VStack>
  );
};

export default withModal(Messenger);
