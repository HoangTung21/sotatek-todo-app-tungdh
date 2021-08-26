export const BulkActions = ({
  multiDone,
  multiRemove,
}: {
  multiDone: () => void;
  multiRemove: () => void;
}) => {
  return (
    <div className="bulk-actions">
      <span>Bulk Action:</span>
      <div className="bulk-actions__action-wrapper">
        <button onClick={multiDone} className="bulk-actions__btn-done">
          Done
        </button>
        <button onClick={multiRemove} className="bulk-actions__btn-remove">
          Remove
        </button>
      </div>
    </div>
  );
};
