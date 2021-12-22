import { useEffect, useState } from "react";

export const useProfileCompleted = (user) => {
  const [percentage, setPercentage] = useState(33);
  const [color, setColor] = useState("#FF4B55");

  useEffect(() => {
    if ((user.dateBirth && user.identityDocumentValidation !== "success") || (!user.dateBirth && user.identityDocumentValidation === "success")) {
      setPercentage(66);
      setColor("#EB9824");
    } else if (user.dateBirth && user.identityDocumentValidation === "success") {
      setPercentage(100);
      setColor("#0D8284");
    } else {
      setPercentage(33);
      setColor("#FF4B55");
    }
  }, [user]);

  return [percentage, color];
};
