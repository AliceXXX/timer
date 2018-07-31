var work_date = [];
var get_date = function (callback) {
    $.getJSON("./json/1.json", function (date) {
        for (var i in date) {
            work_date.push([
                date[i].date,
                date[i].work_title,
                new Date(date[i].start),
                new Date(date[i].stop)]
            );
        }
        callback(work_date);
    });
}
$.when(
    get_date(function(){})
).done(function(){
    google.charts.load('current', { 'packages': ['timeline'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'Room' });
        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows(work_date);
        var options = {
            timeline: { singleColor: '#8d8' },
        };
        chart.draw(dataTable, options);
    }
})
