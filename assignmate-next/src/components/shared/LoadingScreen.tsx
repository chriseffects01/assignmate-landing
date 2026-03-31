type LoadingScreenProps = {
  message?: string;
};

export default function LoadingScreen(props: LoadingScreenProps) {
  const message = props.message ?? "Loading your worspace...";

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-screen-content">
        <div className="loading-orbit">
          <span className="loading-dot loading-dot-1"></span>
          <span className="loading-dot loading-dot-2"></span>
          <span className="loading-dot loading-dot-3"></span>
        </div>

        <p className="loading-screen-text">{message}</p>
      </div>
    </div>
  );
}
