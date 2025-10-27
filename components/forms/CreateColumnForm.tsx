import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface CreateColumnFormProps {
  onClick: () => void;
}

const CreateColumnForm: React.FC<CreateColumnFormProps> = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <Plus /> Add Column
      </Button>
    </div>
  );
};

export default CreateColumnForm;
