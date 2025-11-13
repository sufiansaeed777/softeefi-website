import { useEffect, useState } from 'react';

/**
 * Custom hook for Tawk.to JavaScript API
 * Provides methods to control the chat widget programmatically
 */
export const useTawkTo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWidgetHidden, setIsWidgetHidden] = useState(false);

  useEffect(() => {
    // Check if Tawk.to is loaded
    const checkTawkLoaded = setInterval(() => {
      if (window.Tawk_API && window.Tawk_API.onLoad) {
        setIsLoaded(true);
        clearInterval(checkTawkLoaded);
      }
    }, 100);

    // Cleanup
    return () => clearInterval(checkTawkLoaded);
  }, []);

  // Show the widget
  const showWidget = () => {
    if (window.Tawk_API && window.Tawk_API.showWidget) {
      window.Tawk_API.showWidget();
      setIsWidgetHidden(false);
    }
  };

  // Hide the widget
  const hideWidget = () => {
    if (window.Tawk_API && window.Tawk_API.hideWidget) {
      window.Tawk_API.hideWidget();
      setIsWidgetHidden(true);
    }
  };

  // Maximize the chat window
  const maximize = () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize();
      setIsChatOpen(true);
    }
  };

  // Minimize the chat window
  const minimize = () => {
    if (window.Tawk_API && window.Tawk_API.minimize) {
      window.Tawk_API.minimize();
      setIsChatOpen(false);
    }
  };

  // Toggle chat window
  const toggle = () => {
    if (window.Tawk_API && window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
      setIsChatOpen(!isChatOpen);
    }
  };

  // Set visitor attributes
  const setAttributes = (attributes, callback) => {
    if (window.Tawk_API && window.Tawk_API.setAttributes) {
      window.Tawk_API.setAttributes(attributes, callback);
    }
  };

  // Add event to visitor
  const addEvent = (eventName, metadata, callback) => {
    if (window.Tawk_API && window.Tawk_API.addEvent) {
      window.Tawk_API.addEvent(eventName, metadata, callback);
    }
  };

  // Add tags to visitor
  const addTags = (tags, callback) => {
    if (window.Tawk_API && window.Tawk_API.addTags) {
      window.Tawk_API.addTags(tags, callback);
    }
  };

  // Remove tags from visitor
  const removeTags = (tags, callback) => {
    if (window.Tawk_API && window.Tawk_API.removeTags) {
      window.Tawk_API.removeTags(tags, callback);
    }
  };

  // End chat session
  const endChat = () => {
    if (window.Tawk_API && window.Tawk_API.endChat) {
      window.Tawk_API.endChat();
    }
  };

  // Get visitor data
  const getVisitor = () => {
    if (window.Tawk_API && window.Tawk_API.visitor) {
      return window.Tawk_API.visitor;
    }
    return null;
  };

  // Check if visitor is engaged in chat
  const isChatOngoing = () => {
    if (window.Tawk_API && window.Tawk_API.isChatOngoing) {
      return window.Tawk_API.isChatOngoing();
    }
    return false;
  };

  // Check if chat is minimized
  const isChatMinimized = () => {
    if (window.Tawk_API && window.Tawk_API.isChatMinimized) {
      return window.Tawk_API.isChatMinimized();
    }
    return true;
  };

  // Check if chat is maximized
  const isChatMaximized = () => {
    if (window.Tawk_API && window.Tawk_API.isChatMaximized) {
      return window.Tawk_API.isChatMaximized();
    }
    return false;
  };

  // Check if widget is hidden
  const isVisitorEngaged = () => {
    if (window.Tawk_API && window.Tawk_API.isVisitorEngaged) {
      return window.Tawk_API.isVisitorEngaged();
    }
    return false;
  };

  // Get chat status
  const getStatus = () => {
    if (window.Tawk_API && window.Tawk_API.getStatus) {
      return window.Tawk_API.getStatus();
    }
    return 'offline';
  };

  // Set custom style
  const setCustomStyle = (style) => {
    if (window.Tawk_API) {
      window.Tawk_API.customStyle = style;
    }
  };

  return {
    isLoaded,
    isChatOpen,
    isWidgetHidden,
    showWidget,
    hideWidget,
    maximize,
    minimize,
    toggle,
    setAttributes,
    addEvent,
    addTags,
    removeTags,
    endChat,
    getVisitor,
    isChatOngoing,
    isChatMinimized,
    isChatMaximized,
    isVisitorEngaged,
    getStatus,
    setCustomStyle
  };
};

export default useTawkTo;