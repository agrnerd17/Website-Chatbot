const PastryBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [chatOpen, setChatOpen] = useState(false);
    const messagesEndRef = useRef(null);
  
    // Predefined questions
    const predefinedQuestions = [
      "What are your most popular pastries?",
      "Do you offer vegan options?",
      "What are your operating hours?",
      "Do you provide delivery services?",
      "Can I customize my order?",
    ];
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSend = async (e) => {
      e.preventDefault();
      if (!input.trim()) return;
  
      const newMessage = {
        text: input,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
  
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
  
      try {
        const response = await getChatbotResponse(input);
        const botMessage = {
          text: response,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error with Cohere API:", error);
      }
    };
  
    const handleQuestionClick = (question) => {
      setInput(question);
      handleSend({ preventDefault: () => {} }); // Simulate a form submission
    };
  
    const toggleChat = () => {
      setChatOpen((prev) => !prev);
    };
  
    return (
      <Container sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        {chatOpen ? (
          <ChatContainer>
            <Header>
              <Avatar sx={{ backgroundColor: "#FF1493" }}>
                <GiCupcake size={24} />
              </Avatar>
              <Typography variant="h6">Pastry Bot</Typography>
              <IconButton onClick={toggleChat} sx={{ ml: "auto", color: "white" }}>
                X
              </IconButton>
            </Header>
  
            {/* Predefined Questions */}
            <Box sx={{ padding: "8px", borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
              {predefinedQuestions.map((question, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    padding: "8px",
                    marginBottom: "4px",
                    borderRadius: "8px",
                    backgroundColor: "#f8f8f8",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </Typography>
              ))}
            </Box>
  
            {/* Chat Messages */}
            <MessageContainer>
              {messages.map((message, index) => (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent={message.sender === "user" ? "flex-end" : "flex-start"}
                  alignItems="center"
                  spacing={1}
                >
                  {message.sender === "bot" && (
                    <Avatar sx={{ bgcolor: "#FF69B4", width: 32, height: 32 }}>
                      <GiCupcake size={16} />
                    </Avatar>
                  )}
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        maxWidth: "280px",
                        padding: "8px 12px",
                        borderRadius: "16px",
                        backgroundColor: message.sender === "user" ? "#FF69B4" : "#f0f0f0",
                        color: message.sender === "user" ? "white" : "black",
                      }}
                    >
                      {message.text}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ pl: 1 }}>
                      {message.time}
                    </Typography>
                  </Box>
                </Stack>
              ))}
              <div ref={messagesEndRef} />
            </MessageContainer>
  
            {/* Input Field */}
            <InputContainer>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend(e)}
                size="small"
              />
              <IconButton
                onClick={handleSend}
                color="primary"
                sx={{ backgroundColor: "#FF69B4", "&:hover": { backgroundColor: "#FF1493" } }}
              >
                <FiSend style={{ color: "white" }} />
              </IconButton>
            </InputContainer>
          </ChatContainer>
        ) : (
          <IconButton
            onClick={toggleChat}
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "#FF69B4",
              color: "white",
              borderRadius: "50%",
              padding: "10px",
              zIndex: 9999,
            }}
          >
            <GiCupcake size={24} />
          </IconButton>
        )}
      </Container>
    );
  };
  
  export default PastryBot;
  