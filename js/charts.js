var work_date = [];
var get_date = function (callback) {
    $.getJSON("./json/1.json", function (date) {
        for (var i in date) {
            work_date.push([
                date[i].start.date,
                date[i].start.date,
                new Date(0, 0, 0, date[i].start.h, date[i].start.min, 0),
                new Date(0, 0, 0, date[i].stop.h, date[i].stop.min, 0)]
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
        dataTable.addRows([
            [work_date[0][0], work_date[0][1], work_date[0][2], work_date[0][3]],
            [ '7/1',  'CSS Fundamentals',    new Date(0,0,0,12,0,0),  new Date(0,0,0,14,0,0) ],
            [ '7/1',  'Fundamentals',    new Date(0,0,0,12,0,0),  new Date(0,0,0,15,0,0) ],
            [ '7/2',  'Intro JavaScript',    new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
            [ '7/3',  'Advanced JavaScript', new Date(0,0,0,16,30,0), new Date(0,0,0,19,0,0) ],
            [ '7/4', 'Intermediate Perl',   new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
            [ '7/5', 'Advanced Perl',       new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
            [ '7/6', 'Applied Perl',        new Date(0,0,0,16,30,0), new Date(0,0,0,18,0,0) ],
            [ '7/7',   'Google Charts',       new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
            [ '7/8',   'Closure',             new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
            [ '7/9',   'App Engine',          new Date(0,0,0,16,30,0), new Date(0,0,0,18,30,0) ],
            [ '7/10',   'App Engine',          new Date(0,0,0,16,30,0), new Date(0,0,0,24,30,0) ],
            [ '7/11','',new Date(0,0,0,0,0,0), new Date(0,0,0,0,0,0)],
            [ '7/12',   'App Engine',          new Date(0,0,0,0,0,0), new Date(0,0,0,18,30,0) ]]);

        var options = {
            timeline: { singleColor: '#8d8' },
        };

        chart.draw(dataTable, options);
    }
})
