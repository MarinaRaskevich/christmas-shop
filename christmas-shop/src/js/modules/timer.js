export const updateTimer = () => {
  const timeLeft = calculateTimeLeft();
  updateTimeNumbers(timeLeft);
};

const calculateTimeLeft = () => {
  const nowTs = new Date();
  let christmasTs = new Date(Date.UTC(nowTs.getUTCFullYear(), 0, 1, 0, 0, 0));

  if (nowTs > christmasTs) {
    christmasTs.setUTCFullYear(christmasTs.getUTCFullYear() + 1);
  }

  const timeDifference = christmasTs - nowTs;
  const totalSeconds = Math.floor(timeDifference / 1000);

  return {
    days: Math.floor(totalSeconds / (24 * 60 * 60)),
    hours: Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)),
    minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
    seconds: totalSeconds % 60,
  };
};

const updateTimeNumbers = ({ days, hours, minutes, seconds }) => {
  document.querySelector(".timer__number--days").textContent = days;
  document.querySelector(".timer__number--hours").textContent = hours;
  document.querySelector(".timer__number--minutes").textContent = minutes;
  document.querySelector(".timer__number--seconds").textContent = seconds;
};
