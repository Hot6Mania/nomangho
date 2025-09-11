'use client';

import { useState, useEffect } from 'react';
import { Play, Users, Music, MessageCircle, Settings, Plus, Share2, Volume2 } from 'lucide-react';

export default function Home() {
  const [isOnline, setIsOnline] = useState(false);
  const [connectedUsers] = useState(42);
  const [currentTrack] = useState({
    title: "Lofi Hip Hop Radio - 24/7 Chill Music",
    artist: "ChillOut Music",
    duration: "LIVE"
  });

  useEffect(() => {
    // Simulate connection status
    const timer = setTimeout(() => setIsOnline(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Navigation Header */}
      <nav className="glass-card m-4 mb-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-youtube rounded-xl flex items-center justify-center shadow-apple">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  NoMangHo
                </h1>
                <p className="text-xs text-muted-foreground">지듣노망호</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-sm text-muted-foreground">
                {isOnline ? `${connectedUsers} 명 접속` : '연결 중...'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1 rounded-full">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{connectedUsers}</span>
            </div>
            
            <button className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 p-4">
        {/* Video Player Section */}
        <div className="xl:col-span-3 space-y-4">
          {/* Video Container */}
          <div className="glass-card p-6">
            <div className="video-container group">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                    <Play className="w-12 h-12 text-white ml-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white text-xl font-semibold">{currentTrack.title}</h3>
                    <p className="text-white/70">{currentTrack.artist}</p>
                  </div>
                </div>
              </div>
              
              {/* Video Controls Overlay */}
              <div className="video-overlay">
                <div className="flex items-center space-x-6">
                  <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
              </div>
              
              {/* Sync Status */}
              <div className="absolute top-4 left-4">
                <div className="sync-indicator">
                  <Volume2 className="w-4 h-4" />
                  <span>동기화됨</span>
                </div>
              </div>
              
              {/* Live Indicator */}
              <div className="absolute top-4 right-4">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span>LIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Now Playing Info */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{currentTrack.title}</h3>
                  <p className="text-muted-foreground">{currentTrack.artist}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="status-indicator status-online">
                      <span>재생 중</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {connectedUsers}명이 함께 듣고 있어요
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors hover-lift">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors hover-lift">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Playlist Queue */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">재생 대기열</h3>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                모두 보기
              </button>
            </div>
            
            <div className="space-y-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="playlist-item group">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">Study & Chill Playlist #{item}</h4>
                    <p className="text-sm text-muted-foreground truncate">
                      Lo-Fi Collection · 2:45:32
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat & Users Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          {/* Active Users */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              접속자 ({connectedUsers})
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">User_{i + 1}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Live Chat */}
          <div className="glass-card p-6 flex-1">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              실시간 채팅
            </h3>
            
            <div className="space-y-4 h-96 overflow-y-auto custom-scrollbar mb-4">
              {[
                { user: "MusicLover42", message: "이 곡 정말 좋네요! 🎵", time: "방금" },
                { user: "ChillVibes", message: "다음 곡도 기대됩니다", time: "1분 전" },
                { user: "StudyBuddy", message: "집중이 잘 되는 음악이에요", time: "2분 전" },
                { user: "LoFiFan", message: "이런 플레이리스트 어디서 찾으시나요?", time: "3분 전" }
              ].map((chat, i) => (
                <div key={i} className="chat-message">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {chat.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium">{chat.user}</span>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{chat.message}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-xl">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                className="chat-input"
              />
              <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Play className="w-4 h-4 rotate-180 transform scale-x-[-1]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}