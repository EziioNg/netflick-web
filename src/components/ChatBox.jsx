import { useState } from "react";

import { sendMessageAPI } from "~/apis/index.js";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "hỏi gì đó đi..." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendMessageAPI(msg);
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Có lỗi xảy ra!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-5000">
      {/* Nút toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 cursor-pointer"
      >
        {isOpen ? "Đóng Chat" : "Chat"}
      </button>

      {isOpen && (
        <div className="mt-2 w-[400px] h-96 bg-white shadow-xl rounded-lg border border-gray-300 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg font-semibold">
            Chatbot
          </div>

          {/* Nội dung chat */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2 text-sm bg-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] break-words ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end text-right"
                    : "bg-blue-100 self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="p-2 rounded-lg max-w-[75%] bg-gray-200 text-gray-600 italic self-start text-left">
                Bot đang trả lời...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              type="text"
              placeholder="Nhập tin nhắn..."
              className="flex-1 border rounded px-2 py-1 outline-none bg-static-grey-4 text-white-50"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 cursor-pointer"
              disabled={loading} // chặn spam khi đang load
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
