// src/components/Chatbot.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  type: 'user' | 'bot';
  content: string | JSX.Element; // Updated to support JSX
  isRich?: boolean;
}

interface ChatbotProps {
  userId: string;
}

const Chatbot = ({ userId }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [awaitingEventName, setAwaitingEventName] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  console.log('Chatbot userId:', userId);

  const knowledgeBase = {
    "event metrics": "Key event metrics to track include: attendance rate, participant engagement, session popularity, feedback sentiment, social media mentions, networking effectiveness, and ROI.",
    "event highlights": "Please provide the name of the event for which you would like detailed highlights, or request 'Display all events' to view a complete list.",
    "all events": "Retrieving the full list of events... Please wait.",
    "default": "I am your Event Analytics Assistant, powered by Gemini AI. I can provide event summaries, perform sentiment analysis, generate posters, or answer custom queries like 'description of an event'. Try requesting 'Display all events' or 'What is the price of test'.",
    "unknown": "I do not have sufficient information on that request. Please try 'Display all events' to view available events or ask something like 'description of test'."
  };

  const initialSuggestedQuestions = [
    // { display: "", action: "what metrics should i track?" },
    { display: "Provide event highlights", action: "provide event highlights" },
    { display: "Display all events", action: "display all events" },
    { display: "Summarize an event", action: "summarize an event" },
    { display: "Perform sentiment analysis for an event", action: "perform sentiment analysis for an event" },
    // { display: "Generate a poster for an event", action: "generate a poster for an event" }
  ];

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      setMessages([{ type: 'bot', content: knowledgeBase.default }]);
      addQuickOptions(initialSuggestedQuestions);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages]);

  const addMessage = (type: 'user' | 'bot', content: string | JSX.Element) => {
    setMessages(prev => [...prev, { type, content }]);
  };

  const addRichMessage = (content: string | JSX.Element) => {
    setMessages(prev => [...prev, { type: 'bot', content, isRich: true }]);
  };

  const showTypingIndicator = () => setIsTyping(true);
  const hideTypingIndicator = () => setIsTyping(false);
  const showGeminiLoading = () => setIsGeminiLoading(true);
  const hideGeminiLoading = () => setIsGeminiLoading(false);

  const addQuickOptions = (options: { display: string, action: string }[]) => {
    const optionsHTML = `
      <div class="flex flex-wrap gap-2">
        ${options.map(opt => `<button class="px-2 py-1 bg-gray-200 rounded hover:bg-blue-500 hover:text-white" onclick="window.dispatchEvent(new CustomEvent('sendMessage', { detail: '${opt.action}' }))">${opt.display}</button>`).join('')}
      </div>
    `;
    addRichMessage(optionsHTML);
  };

  const fetchAllEvents = async () => {
    try {
      const response = await fetch('/api/chatbot/events', {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch events');
      return await response.json();
    } catch (error) {
      console.error('Fetch all events error:', error);
      return null;
    }
  };

  const fetchEventDetails = async (eventName: string) => {
    try {
      const response = await fetch(`/api/chatbot/events?query=${encodeURIComponent(eventName)}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`Failed to fetch event: ${eventName}`);
      const events = await response.json();
      return events.length > 0 ? [events[0]] : [];
    } catch (error) {
      console.error('Fetch event details error:', error);
      return null;
    }
  };

  const fetchGeminiResponse = async (message: string) => {
    try {
      const response = await fetch('/api/chatbot/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error('Failed to fetch Gemini response');
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Gemini API error:', error);
      return "Sorry, I couldn't process that request due to an error.";
    }
  };

  const handleCheckout = async (event: any) => {
    console.log('handleCheckout called for event:', event._id);
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price || '0',
      isFree: event.isFree,
      buyerId: userId,
    };
    console.log('Order data:', order);
    try {
      const response = await fetch('/api/chatbot/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      console.log('Fetch response status:', response.status);
      if (!response.ok) throw new Error('Checkout failed');
      const data = await response.json();
      console.log('Redirecting to:', data.url);
      window.location.href = data.url; // Client-side redirect
    } catch (error) {
      console.error('Checkout error:', error);
      addMessage('bot', 'Failed to initiate checkout. Please try again.');
    }
  };

  const displayEventDetails = (event: any) => {
    const eventDetails = (
      <div>
        <h4 className="text-lg font-semibold">{event.title}</h4>
        <div className="mt-2">
          <p><strong>Date:</strong> {new Date(event.startDateTime).toLocaleString()} - {new Date(event.endDateTime).toLocaleString()}</p>
          <p><strong>Location:</strong> {event.location || 'Not specified'}</p>
          <p><strong>Description:</strong> {event.description || 'No description available'}</p>
          <p><strong>Price:</strong> {event.isFree ? 'Free' : event.price || 'Not specified'}</p>
          {event.url && (
            <p>
              <strong>URL:</strong>{' '}
              <a
                href={event.url}
                target="_blank"
                className="text-blue-500 underline break-all max-w-full inline-block"
              >
                {event.url}
              </a>
            </p>
          )}
          <p><strong>Category:</strong> {event.category?.name || 'Not specified'}</p>
          <p><strong>Organizer:</strong> {event.organizer ? `${event.organizer.firstName} ${event.organizer.lastName}` : 'Not specified'}</p>
        </div>
        <div className="mt-2">
          <h5 className="text-md font-medium">Event Image</h5>
          <div className="flex gap-2 flex-wrap">
            <div>
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-24 h-24 object-cover cursor-pointer" 
                onClick={() => {
                  const lightbox = document.createElement('div');
                  lightbox.className = 'fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50';
                  lightbox.innerHTML = `
                    <div class="absolute top-5 right-5 text-white text-2xl cursor-pointer" onclick="this.parentElement.remove()">×</div>
                    <img src="${event.imageUrl}" alt="Enlarged event photo" class="max-w-[90%] max-h-[90%]">
                  `;
                  document.body.appendChild(lightbox);
                  lightbox.addEventListener('click', (ev) => ev.target === lightbox && lightbox.remove());
                }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">Click to enlarge</p>
          <button 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {
              console.log('Buy button clicked for event:', event._id);
              handleCheckout(event);
            }}
          >
            {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
          </button>
        </div>
      </div>
    );
    addRichMessage(eventDetails);
  };

  const processAllEventsRequest = async () => {
    addMessage('bot', "Retrieving the full list of events... Please wait.");
    showTypingIndicator();
    const events = await fetchAllEvents();
    hideTypingIndicator();
    if (events && events.length > 0) {
      events.forEach((event: any) => displayEventDetails(event));
      const filteredOptions = initialSuggestedQuestions.filter(q => q.action !== "display all events");
      filteredOptions.push({ display: "Which event do you want to continue with?", action: "which event do you want to continue with?" });
      addQuickOptions(filteredOptions);
    } else {
      addMessage('bot', "No events were found, or an error occurred during retrieval. Please ensure events are available in the database.");
    }
  };

  const processEventSelection = (eventName: string) => {
    setSelectedEvent(eventName);
    addMessage('bot', `You have selected "${eventName}". Now I will assist you with this event only.`);
    const eventSpecificOptions = [
      { display: `Show sentiment analysis for ${eventName}`, action: `show sentiment analysis for ${eventName.toLowerCase()}` },
      { display: `Summarize ${eventName}`, action: `summarize ${eventName.toLowerCase()}` },
      { display: `Generate a poster for ${eventName}`, action: `generate a poster for ${eventName.toLowerCase()}` }
    ];
    addQuickOptions(eventSpecificOptions);
  };

  const processEventHighlightsRequest = async (eventName: string) => {
    addMessage('bot', `Retrieving details for "${eventName}"... Please wait.`);
    showTypingIndicator();
    const events = await fetchEventDetails(eventName);
    hideTypingIndicator();
    if (events && events.length > 0) {
      displayEventDetails(events[0]);
    } else {
      addMessage('bot', `The event "${eventName}" could not be found. Please verify the event name or try 'Display all events' to see available options.`);
    }
    setAwaitingEventName(false);
  };

  const processSummarizeRequest = async (eventName: string) => {
    showGeminiLoading();
    const events = await fetchEventDetails(eventName);
    if (events && events.length > 0) {
      const event = events[0];
      const prompt = `Provide a concise summary of the following event: Title: ${event.title}, Description: ${event.description}, Date: ${new Date(event.startDateTime).toLocaleString()} - ${new Date(event.endDateTime).toLocaleString()}`;
      const summary = await fetchGeminiResponse(prompt);
      hideGeminiLoading();
      addMessage('bot', `Summary of "${eventName}": ${summary}`);
    } else {
      hideGeminiLoading();
      addMessage('bot', `The event "${eventName}" could not be located for summarization. Please check the event name or use 'Display all events'.`);
    }
  };

  const processSentimentRequest = async (eventName: string) => {
    showGeminiLoading();
    const events = await fetchEventDetails(eventName);
    if (events && events.length > 0) {
      const event = events[0];
      const prompt = `Perform a sentiment analysis on the following event description: "${event.description}"`;
      const sentiment = await fetchGeminiResponse(prompt);
      hideGeminiLoading();
      addMessage('bot', `Sentiment analysis for "${eventName}": ${sentiment}`);
    } else {
      hideGeminiLoading();
      addMessage('bot', `The event "${eventName}" could not be found for sentiment analysis. Please verify the event name or try 'Display all events' to view available events.`);
    }
  };

  const processPosterRequest = async (eventName: string) => {
    showGeminiLoading();
    const events = await fetchEventDetails(eventName);
    if (events && events.length > 0) {
      const event = events[0];
      const prompt = `Generate a concise, creative poster description for an event titled "${event.title}" with the description "${event.description}" occurring on ${new Date(event.startDateTime).toLocaleString()}. Include a compelling tagline and essential details in a single paragraph, formatted for display.`;
      const posterIdea = await fetchGeminiResponse(prompt);
      hideGeminiLoading();

      const posterHTML = `
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-md">
          <h4 class="text-xl font-bold mb-2">${event.title}</h4>
          <p class="text-sm">${posterIdea}</p>
          <p class="mt-2 text-xs italic">Generated by Gemini AI</p>
        </div>
      `;
      addRichMessage(posterHTML);
    } else {
      hideGeminiLoading();
      addMessage('bot', `The event "${eventName}" could not be found to generate a poster description. Please check the event name or use 'Display all events'.`);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setSelectedEvent(null);
    setAwaitingEventName(false);
    setInput('');
    setIsTyping(false);
    setIsGeminiLoading(false);
  };

  const processUserMessage = async (message: string) => {
    const normalizedMessage = message.trim().toLowerCase();

    if (awaitingEventName) {
      await processEventHighlightsRequest(message);
      return;
    }

    if (normalizedMessage.includes("display") && normalizedMessage.includes("all") && normalizedMessage.includes("events")) {
      await processAllEventsRequest();
      return;
    }

    if (normalizedMessage.includes("which event do you want to continue with")) {
      addMessage('bot', "Please type the name of the event you want to continue with (e.g., 'test').");
      return;
    }

    if (normalizedMessage === "summarize an event") {
      addMessage('bot', "Please provide the name of the event you want to summarize (e.g., 'Summarize test').");
      return;
    }

    if (normalizedMessage.startsWith("what is the price of") || normalizedMessage.startsWith("price of")) {
      const eventNameMatch = normalizedMessage.match(/(?:what is the price of|price of)\s+(.+)/);
      if (eventNameMatch && eventNameMatch[1]) {
        const eventName = eventNameMatch[1].trim();
        const events = await fetchEventDetails(eventName);
        if (events && events.length > 0) {
          const event = events[0];
          const price = event.isFree ? 'Free' : event.price || 'Not specified';
          addMessage('bot', `The price of "${eventName}" is ${price}.`);
        } else {
          addMessage('bot', `The event "${eventName}" could not be found. Please check the event name or use 'Display all events' to see available options.`);
        }
        return;
      }
    }

    if (normalizedMessage.startsWith("location of")) {
      const eventNameMatch = normalizedMessage.match(/location of\s+(.+)/);
      if (eventNameMatch && eventNameMatch[1]) {
        const eventName = eventNameMatch[1].trim();
        const events = await fetchEventDetails(eventName);
        if (events && events.length > 0) {
          const event = events[0];
          const location = event.location || 'Not specified';
          addMessage('bot', `The location of "${eventName}" is ${location}.`);
        } else {
          addMessage('bot', `The event "${eventName}" could not be found. Please check the event name or use 'Display all events' to see available options.`);
        }
        return;
      }
    }

    if (normalizedMessage.match(/(description|details|highlights|organizer|category|date) of\s+(.+)/)) {
      const match = normalizedMessage.match(/(description|details|highlights|organizer|category|date) of\s+(.+)/);
      if (match && match[2]) {
        const queryType = match[1];
        const eventName = match[2].trim();
        const events = await fetchEventDetails(eventName);
        if (events && events.length > 0) {
          const event = events[0];
          showGeminiLoading();
          const prompt = `Based on the following event data: Title: ${event.title}, Description: ${event.description || 'None'}, Date: ${new Date(event.startDateTime).toLocaleString()} - ${new Date(event.endDateTime).toLocaleString()}, Location: ${event.location || 'Not specified'}, Price: ${event.isFree ? 'Free' : event.price || 'Not specified'}, Organizer: ${event.organizer ? `${event.organizer.firstName} ${event.organizer.lastName}` : 'Not specified'}, Category: ${event.category?.name || 'Not specified'}, provide a concise ${queryType} for the event "${eventName}".`;
          const response = await fetchGeminiResponse(prompt);
          hideGeminiLoading();
          addMessage('bot', `${queryType.charAt(0).toUpperCase() + queryType.slice(1)} of "${eventName}": ${response}`);
        } else {
          addMessage('bot', `The event "${eventName}" could not be found. Please check the event name or use 'Display all events' to see available options.`);
        }
        return;
      }
    }

    if (selectedEvent) {
      const eventLower = selectedEvent.toLowerCase();
      const expectedSummarize = `summarize ${eventLower}`;
      const expectedSentiment = `show sentiment analysis for ${eventLower}`;
      const expectedPoster = `generate a poster for ${eventLower}`;

      if (normalizedMessage === expectedSentiment) {
        await processSentimentRequest(selectedEvent);
      } else if (normalizedMessage === expectedSummarize) {
        await processSummarizeRequest(selectedEvent);
      } else if (normalizedMessage === expectedPoster) {
        await processPosterRequest(selectedEvent);
      } else {
        addMessage('bot', `I'm currently focused on "${selectedEvent}". Please use one of these options:`);
        const eventSpecificOptions = [
          { display: `Show sentiment analysis for ${selectedEvent}`, action: `show sentiment analysis for ${eventLower}` },
          { display: `Summarize ${selectedEvent}`, action: `summarize ${eventLower}` },
          { display: `Generate a poster for ${selectedEvent}`, action: `generate a poster for ${eventLower}` }
        ];
        addQuickOptions(eventSpecificOptions);
      }
      return;
    } else if (normalizedMessage === "test" || normalizedMessage.match(/^[a-zA-Z\s]+$/)) {
      const events = await fetchEventDetails(message);
      if (events && events.length > 0) {
        processEventSelection(message);
        return;
      }
    }

    if (normalizedMessage.includes("event highlights")) {
      setAwaitingEventName(true);
      addMessage('bot', knowledgeBase["event highlights"]);
      return;
    }

    if (normalizedMessage.includes("summarize")) {
      const eventName = message.split("summarize")[1]?.trim();
      if (eventName) {
        await processSummarizeRequest(eventName);
        return;
      }
    }

    if (normalizedMessage.includes("analyze sentiment") || normalizedMessage.includes("perform sentiment analysis")) {
      const eventName = message.split("for")[1]?.trim();
      if (eventName) {
        await processSentimentRequest(eventName);
        return;
      } else {
        addMessage('bot', "Please specify an event name after 'analyze sentiment for' (e.g., 'Analyze sentiment for Mumbai Hackathon').");
      }
      return;
    }

    if (normalizedMessage.includes("design a poster") || normalizedMessage.includes("generate a poster")) {
      const eventName = message.split("for")[1]?.trim();
      if (eventName) {
        await processPosterRequest(eventName);
        return;
      } else {
        addMessage('bot', "Please specify an event name after 'generate a poster for' (e.g., 'Generate a poster for Mumbai Hackathon').");
      }
      return;
    }

    let response = null;
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (normalizedMessage.includes(key)) {
        response = value;
        break;
      }
    }

    response = response || (normalizedMessage.match(/hello|hi|hey/) ? knowledgeBase.default : knowledgeBase.unknown);
    addMessage('bot', response);
    if (response === knowledgeBase.unknown || response === knowledgeBase.default) {
      addQuickOptions(initialSuggestedQuestions);
    }
  };

  const handleSend = () => {
    if (input) {
      addMessage('user', input);
      showTypingIndicator();
      processUserMessage(input).then(() => hideTypingIndicator());
      setInput('');
    }
  };

  useEffect(() => {
    const handleCustomSend = (e: CustomEvent) => {
      addMessage('user', e.detail);
      showTypingIndicator();
      processUserMessage(e.detail).then(() => hideTypingIndicator());
    };

    window.addEventListener('sendMessage', handleCustomSend as EventListener);

    return () => {
      window.removeEventListener('sendMessage', handleCustomSend as EventListener);
    };
  }, []);

  return (
    <>
      {!isOpen && (
        <div 
          className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer z-50 hover:bg-blue-600 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      )}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-[500px] bg-white rounded-lg shadow-lg z-50 flex flex-col">
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Event Analytics Assistant</h3>
            <div className="flex items-center gap-2">
              <button 
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={resetChat}
              >
                Restart
              </button>
              <button 
                className="text-white text-xl w-6 h-6 flex items-center justify-center hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                −
              </button>
            </div>
          </div>
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                {msg.isRich && typeof msg.content !== 'string' ? (
                  <div className={`p-2 rounded-lg max-w-[80%] ${msg.type === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100 text-black'}`}>
                    {msg.content}
                  </div>
                ) : (
                  <div 
                    className={`p-2 rounded-lg max-w-[80%] ${msg.type === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100 text-black'}`}
                    dangerouslySetInnerHTML={{ __html: typeof msg.content === 'string' ? msg.content : '' }}
                  />
                )}
              </div>
            ))}
            {isGeminiLoading && (
              <div className="flex justify-center items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping delay-200"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping delay-400"></div>
              </div>
            )}
            {isTyping && !isGeminiLoading && (
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex p-3 border-t border-gray-200">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
              placeholder="Type your message here..." 
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;