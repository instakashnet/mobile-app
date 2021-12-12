import { useEffect, useState } from "react";

export const useProfileCompleted = (user) => {
  const [percentage, setPercentage] = useState(33);
  const [color, setColor] = useState("#FF4B55");

  useEffect(() => {
    if (
      (user.dateBirth && !user.identityPhotoFront && !user.identityPhotoBack) ||
      (!user.dateBirth && !user.identityPhotoFront && user.identityPhotoBack) ||
      (!user.dateBirth && user.identityPhotoFront && !user.identityPhotoBack)
    ) {
      setPercentage(66);
      setColor("#EB9824");
    } else if (
      (user.dateBirth && user.identityPhotoFront && !user.identityPhotoBack) ||
      (user.dateBirth && !user.identityPhotoFront && user.identityPhotoBack) ||
      (!user.dateBirth && user.identityPhotoFront && user.identityPhotoBack)
    ) {
      setPercentage(88);
      setColor("#EB9824");
    } else if (user.dateBirth && user.identityPhotoFront && user.identityPhotoBack) {
      setPercentage(100);
      setColor("#F9F443");
    } else {
      setPercentage(33);
      setColor("#FF4B55");
    }
  }, [user]);

  return [percentage, color];
};
