import './Sidebar.css';
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { Context } from '../../Context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { newChat, onSent, previousPrompts, setRecentPrompt } = useContext(Context);
   
  // Function to load the selected prompt
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt); // Set the recent prompt
    await onSent(prompt); // Send the prompt directly
  };

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        {/* Menu icon to toggle the sidebar */}
        <img 
          onClick={() => setExtended(prev => !prev)} 
          src={assets.menu_icon} 
          alt="Menu" 
          className='menu' 
        />
        {/* New chat button */}
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="New Chat" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent prompts section */}
        {extended && (
          <div className="recent">
            <p className='recent-title'>Recent</p>
            {previousPrompts.slice(0, 18).map((item, index) => (
              <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item} ...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        {/* Help, Activity, and Settings sections */}
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
