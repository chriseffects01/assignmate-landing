'use client';

import '@/src/styles/workspace/workspace-ai.css';

export default function WorkspaceAiAssistant() {
  return (
    <div className="ai-workspace-card">
      {/* Module Title Section */}
      <div className="ai-card-header">
        <div className="ai-title-group">
          <span className="ai-spark-icon">✨</span>
          <h3 className="ai-card-title">AI Assistant Workspace</h3>
        </div>
        <span className="ai-status-pill">v1.0.1 - Active</span>
      </div>

      <p className="ai-card-subtitle">
        Prompt the engine to draft outlines, generate code formulas, or write
        context sections. Finalized blocks can be pasted onto the main canvas
        document.
      </p>

      {/* --- CHAT HISTORY CONTAINER STREAM --- */}
      <div className="ai-chat-history-stream">
        {/* Turn 1: User Request */}
        <div className="chat-bubble-row user-message-row">
          <div className="message-avatar">👤</div>
          <div className="message-content-bubble">
            Draft a 3-point outline detailing optimization constraints in
            distributed microservice database architectures.
          </div>
        </div>

        {/* Turn 2: AI Execution State */}
        <div className="chat-bubble-row ai-message-row">
          <div className="message-avatar ai-avatar">🧠</div>
          <div className="message-content-bubble">
            <div className="ai-thinking-status-wrapper">
              <span className="pulse-dot-cyan"></span>
              <span className="status-text-cyan">AI is deep in thought...</span>
            </div>
            <p className="ai-stream-text-placeholder">
              Analyzing schema nodes... mapping transactional isolation
              structures across localized state clusters.
            </p>
          </div>
        </div>
      </div>

      {/* --- INTERACTIVE PROMPT CONTROLLER CORE --- */}
      <div className="ai-prompt-controller-box">
        <div className="ai-input-action-bar">
          <input
            type="text"
            className="ai-terminal-input"
            placeholder="Tell AI your assignment topic or task rules..."
          />
          <button className="ai-plane-send-btn" aria-label="Send Payload Link">
            <span className="btn-icon-plane">✈️</span>
          </button>
        </div>

        <div className="ai-input-footer-hints">
          <span>💡 Shift + Enter for new lines</span>
          <span>⚡ Direct Markdown Stream</span>
        </div>
      </div>
    </div>
  );
}
