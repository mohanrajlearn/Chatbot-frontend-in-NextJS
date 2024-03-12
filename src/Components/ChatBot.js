import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Paper, TextField, Button, Typography, CircularProgress, Menu,
  MenuItem
} from '@mui/material';
import { Minimize, Chat } from '@mui/icons-material';
import * as OpenAI from 'openai-api';

// import '../styles/globals.css';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
// Import the license key from the configuration file
import { licenseKey } from './config';

import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import { chat, reverseGeocode } from '@/store/slices/companySlice';
import { useDispatch, useSelector } from "react-redux";

const ChatBot = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'AI', content: 'Welcome to AI-chatbot for the Zomato Restuarant details. How can I help you?' }
  ]);
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsDivOpen(!isDivOpen);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsDivOpen(!isDivOpen);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setHighlighted(true);
    const timeout = setTimeout(() => {
      setHighlighted(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const defaultPrompts = ['Tell me about nearby restaurants', 'What is the popular restuarants?', 'What are the family restuarants?', 'list out bar restuarants', 'pet friendly restuarants', 'different ambience restuarants'];

  const handleDefaultPromptClick = (prompt) => {
    setMessages([...messages, { sender: 'user', content: prompt }]);
    handleSendMessage(prompt);
    setSelectedPrompt(prompt); // Set the selected prompt
    handleMenuClose(); // Close the menu
  };


  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const handleSendMessage = async (message) => {
    setLoading(true);

    try {
      // Get user's location
      const userLocation = await getUserLocation();

      // Reverse geocode user's location
      const locationData = await dispatch(reverseGeocode(userLocation.latitude, userLocation.longitude));
      const userCity = locationData ? locationData : 'Unknown';

      // Include the license key in the headers
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${licenseKey}`,
      };

      console.log('Payload sent to chatbot API:', {
        message,
        location: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          city: userCity,
        },
      });
      // Check if the user's query is related to the city or location
      const isCityRelatedQuery = message.toLowerCase().includes('city') ||
        message.toLowerCase().includes('location') ||
        message.toLowerCase().includes('near') ||
        message.toLowerCase().includes('nearby');

      // Conditionally include city information in the message to the chatbot
      const chatMessage = isCityRelatedQuery ? `${message} in ${userCity}` : `${message}`;

      // Dispatch the chat action with the user's message, headers, and location information
      const res = await dispatch(chat({
        message: chatMessage,
        location: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          city: userCity,
        },
      }, headers));
      console.log('Chatbot API Response:', res.data);
      // Update the state with user's message and AI's response
      // Update the state with user's message and AI's response, including city information
      const aiMessage = {
        sender: 'AI',
        content: res.data.reply,
        cityInfo: { city: userCity, latitude: userLocation.latitude, longitude: userLocation.longitude },
      };
      setMessages([...messages, { sender: 'user', content: message, cityInfo: { city: userCity, latitude: userLocation.latitude, longitude: userLocation.longitude } }, aiMessage]);
      scrollToBottom();
      setInputValue('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const scrollToBottom = () => {
    const container = messagesEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };


  return (
    <div className="mt-10">
      <p className='font-bold text-center text-2xl'>Chat Support</p>
      {/* <button onClick={() => {
                        router.push("/call");
                      }} >call</button> */}
      <Container maxWidth="xs">
        <Paper elevation={10} className="mt-10 w-full h-full md:w-auto md:h-full sm:w-auto p-0">
          <div className="flex justify-between rounded-sm border-b-4 
            bg-[#2C4F17] text-white mb-2 p-3 md:p-2">
            <h1 className='mt-1 text-lg'>Chat</h1>
          </div>

          <div className="h-96 mx-2 overflow-y-auto mb-4 md:h-60
            scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            ref={messagesEndRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`msg ${message.sender === 'AI' ? 'received' : 'sent'} ${message.sender === 'AI' ? 'mb-4' : ''
                  }`}
              >
                {/* Display both user's and AI's messages */}
                <div className={message.sender === 'user'}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <div className="ml-5">

              <CircularProgress size={20} sx={{ color: "#2C4F17" }} />
            </div>
          )}
          <div className="flex">
            <div className="bg-[#D3D3D3] border border-2 rounded p-2 w-16 h-14 mt-5 mx-2 cursor-pointer"
              onClick={handleMenuClick}
              style={{ borderRadius: '150px' }} // Adjust the value as needed
            >
              {isDivOpen ? (
                <CloseIcon className='brightness-50' sx={{ color: '#2C4F17', fontSize: '35px' }} />
              ) : (
                <LiveHelpIcon className='brightness-50' sx={{ color: '#2C4F17', fontSize: '35px' }} />
              )}
            </div>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              {defaultPrompts.map((prompt, index) => (
                <MenuItem key={index} onClick={() => handleDefaultPromptClick(prompt)}>
                  {prompt}
                </MenuItem>
              ))}
            </Menu>

            <div className="flex">

              <TextField
                className="my-5 text-xs"
                label="Enter your search..."
                variant="outlined"
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <button
                className="hover:bg-[white] hover:text-[#2C4F17]
                 hover:border-2 hover:border-[#2C4F17] font-sans my-5
                 rounded-md w-48 sm:w-auto h-14 mx-2 bg-[#2C4F17] text-white font-[900]"
                onClick={() => {
                  const message = inputValue;
                  setMessages([...messages, { sender: 'user', content: message }]);
                  handleSendMessage(message);
                }}
              >
                Ask
              </button>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default ChatBot;


