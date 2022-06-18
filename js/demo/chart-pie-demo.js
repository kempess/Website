// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$(document).ready(function(){
  loadTodaysBest();
})

function loadTodaysBest(){
  $.ajax({
      type: "POST",
      url: '/todaysBest',
      data: {
          "_token": $('#csrf').val(),
      }
  }).done(function(data, textStatus, jqXHR) {
    var todaysbest = JSON.parse(data)
    console.log(todaysbest.tblabels);
    // Pie Chart Example
    var ctx3 = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: todaysbest.tblabels,
        datasets: [{
          data: todaysbest.tbvalues,
          backgroundColor: ['#142459', '#820401', '#142459', '#820401', '#142459', '#820401', '#142459', '#820401', '#142459', '#820401'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2e59d9', '#17a673', '#2e59d9', '#17a673', '#2e59d9', '#17a673', '#2e59d9', '#17a673'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80,
      },
    });

    $('#tb').text(todaysbest.tblabels[0])
  })
}
