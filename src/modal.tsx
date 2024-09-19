import { Button, Modal } from "@northlight/ui";
import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";

export const ScoreboardModal = forwardRef((props: {
  children: React.ReactNode;
  text: string;
}, ref) => {
  const [modal, setModal] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setModal(true),
    close: () => setModal(false),
  }));
  console.log(`Modal "${props.text}" mounted`)

  return (
    <>
      <Button onClick={() => setModal(true)}>{props.text}</Button>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        {props.children}
      </Modal>
    </>
  );
});
