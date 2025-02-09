import Button from "../button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onYes: () => void;
}

export default function ConfirmationModal({ isOpen, onClose, onYes }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-[40%] shadow-lg">
        <h2 className="text-center text-3xl pb-5 text-[#ff8433]">
          Are you sure you want to delete?
        </h2>
        <div className="flex text-xl justify-center">
          <Button onClick={onClose} className="mr-2">
            No
          </Button>
          <Button onClick={onYes}>Yes</Button>
        </div>
      </div>
    </div>
  );
}
