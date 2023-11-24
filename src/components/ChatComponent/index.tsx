import React, { useState } from "react";
import * as S from "./styles";
import { apiClient } from "../../services/api";

export const ChatComponent = ({ isVisible }: any) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    // Adicione a mensagem ao histórico
    setChatHistory([...chatHistory, { sender: "user", text: message }]);

    // Envie a mensagem para o backend e receba a resposta
    try {
      const response = await apiClient().post("/bot-ia/suporte", {
        pergunta: message,
      });
      setChatHistory([
        ...chatHistory,
        { sender: "bot", text: response.data.body },
      ]);
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    }

    setMessage("");
  };

  return (
    <S.ChatContainer isVisible={isVisible}>
      <S.ChatHistory>
        {chatHistory.map((msg, index) => (
          <S.ChatMessage key={index} sender={msg.sender}>
            {msg.text}
          </S.ChatMessage>
        ))}
      </S.ChatHistory>
      <S.ChatInputContainer>
        <S.ChatInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <S.SendButton onClick={sendMessage}>Enviar</S.SendButton>
      </S.ChatInputContainer>
    </S.ChatContainer>
  );
};
