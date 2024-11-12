import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type SignInModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen}
     >
  
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
       
        </DialogHeader>
      </DialogContent>
    </Dialog>

  );
};

export default SignInModal;
