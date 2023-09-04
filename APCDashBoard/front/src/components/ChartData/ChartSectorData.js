export const randomData = () => ({
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  datasets: [
    {
      label: "sector 별 재고 상황",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      backgroundColor: [
        "rgb(255, 99, 71,1)",
        "rgb(255, 99, 132,1)",
        "rgb(255, 129, 98, 1)",
        "rgb(255, 159, 64,1)",
        "rgb(255, 205, 86,1)",
        "rgb(75, 192, 192,1)",
        "rgb(0, 128, 128,1)",
        "rgb(54, 162, 235,1)",
        "rgb(127.5, 49.5, 35.5,1)",
        "rgb(153, 102, 255,1)",
        "rgb(201, 203, 207,1)",
        "rgb(0, 0, 0,1)",
      ],
      borderColor: [
        "rgb(255, 99, 71)",
        "rgb(255, 99, 132)",
        "rgb(255, 129, 98)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(0, 128, 128)",
        "rgb(54, 162, 235)",
        "rgb(127.5, 49.5, 35.5)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
        "rgb(0, 0, 0)",
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
        labelString: "재고",
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
        stepSize: 5, // 증가범위
        beginAtZero: true,
        max: 100, // 최대범위
        min: 85, // 최소범위
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
