export const randomData = () => {
  return {
    labels: [
      "과중(g / 10)",
      "종경(mm)",
      "횡경(mm)",
      "L/D비율(%)",
      "경도(N/ø11mm)",
      "당도(˚Brix)",
      "산도 * 100(% * 100)",
      "착색(Hunter A)",
    ],
    datasets: [
      {
        label: "평균 데이터",
        data: [1, 2, 3, 4, 5, 6, 7, 8],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(0, 0, 0, 1)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(0, 0, 0)",
        ],
      },
    ],
  };
};

export const options = {
  scales: {
    x: {
      stacked: false, // 쌓임
      display: true, // x 축 show
      ticks: {
        stepSize: 20, // 증가범위
        beginAtZero: true,
        max: 100, // 최대범위
        min: 0, // 최소범위
        padding: 10, // 오른쪽 간격
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
      scaleLabel: {
        display: true,
        labelString: "데이터",
      },
    },
  },
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
};
