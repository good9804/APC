export const randomData = () => ({
  labels: [
    "10분 전",
    "9분 전",
    "8분 전",
    "7분 전",
    "6분 전",
    "5분 전",
    "4분 전",
    "3분 전",
    "2분 전",
    "1분 전",
    "현재",
  ],
  datasets: [
    {
      label: "최근 1시간 온도(10분 단위)",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      backgroundColor: [
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderColor: [
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(255, 0, 0)",
      ],
    },
  ],
});

export const options = {
  scales: {
    x: {
      stacked: false, // 쌓임
      display: true, // x 축 show
      scaleLabel: {
        display: true,
        labelString: "시간",
      },
      grid: {
        drawBorder: false,
        color: "#323232",
        lineWidth: 1,
      },
    },
    // y축 옵션
    y: {
      stacked: false, // 쌓임
      display: true, // y 축 show
      ticks: {
        stepSize: 0.1, // 증가범위
        beginAtZero: true,
        max: -15, // 최대범위
        min: -20, // 최소범위
        padding: 5, // 오른쪽 간격
      },
      grid: {
        drawBorder: false,
        color: "#323232",
        lineWidth: 1,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};
