export const randomData = () => ({
  labels: ["A", "B", "C", "가공"],
  datasets: [
    {
      label: "등급 데이터",
      data: [1, 2, 3, 4],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 205, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
      ],
    },
  ],
});

export const options = {
  scales: {
    x: {
      stacked: false, // 쌓임
      display: true, // x 축 show
      ticks: {
        stepSize: 1, // 증가범위
        beginAtZero: true,
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
    },
  },
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
};
