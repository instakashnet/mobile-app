import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const useProfileCompleted = (user) => {
  const [percentage, setPercentage] = useState(33);
  const [color, setColor] = useState("#FF4B55");

  useFocusEffect(
    useCallback(() => {
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
    }, [user])
  );

  return [percentage, color];
};
