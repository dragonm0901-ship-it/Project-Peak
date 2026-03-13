import React, { useState } from 'react';

const CommunityHub = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <div
        className={`bg-pureWhite w-80 shadow-2xl rounded-2xl border border-richBlue/10 overflow-hidden transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-0 opacity-0 h-0 w-0'}`}
      >
        <div className="bg-richBlue p-4 flex justify-between items-center text-pureWhite">
          <div className="font-sans font-bold tracking-wider text-sm">Live Group Chat</div>
          <button onClick={() => setIsOpen(false)} className="text-pureWhite/50 hover:text-pureWhite">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-4 h-64 overflow-y-auto bg-offWhite flex flex-col gap-3 text-xs font-sans">
          <div className="bg-richBlue/10 p-2 rounded-xl rounded-tl-none self-start max-w-[80%] text-richBlue">
            <span className="font-bold text-[10px] block mb-1">Sarah (EBC Oct 12)</span>
            Has anyone rented a down jacket in Thamel?
          </div>
          <div className="bg-softRed/10 p-2 rounded-xl rounded-tr-none self-end max-w-[80%] text-richBlue text-right">
            <span className="font-bold text-[10px] block mb-1">Mark (Guide)</span>
            Yes, many shops near Chhaya Center.
          </div>
        </div>
        <div className="p-3 border-t border-richBlue/10 flex gap-2">
          <input type="text" placeholder="Type a message..." className="w-full bg-offWhite rounded-full px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-softRed" />
          <button className="bg-softRed text-pureWhite p-2 rounded-full hover:bg-softRed/90">
             <svg className="w-4 h-4 transform rotate-45 ml-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-richBlue text-pureWhite p-4 rounded-full shadow-lg hover:bg-richBlue/90 transition-transform hover:scale-105 group relative"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          {/* Notification dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-softRed border-2 border-pureWhite rounded-full"></span>
        </button>
      )}
    </div>
  );
};

export default CommunityHub;
