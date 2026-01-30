function EmptyState(message) {
  return function Message({ Text }) {
    return <div className="dark:text-dark-mode text-lg">{Text}</div>;
  };
}

export default EmptyState;
