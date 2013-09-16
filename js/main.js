YUI().use('anim', 'button', 'calendar', function(Y) {
    var update = function(self) {
        Y.one('#timer').setHTML(self.daysLeft + ' days and ' + self.hoursLeft + ':' +
            self.minutesLeft + ':' + self.secondsLeft);
    };

    var params = JSON.parse(atob(location.hash.slice(1)) || '{}');
    if (params.ten !== undefined) {
        params.ten = new Date(params.ten);
    }
    if (params.zero !== undefined) {
        params.zero = new Date(params.zero);
    }
    var visual = countdown.blocks('#visual', params).run(update);

    Y.one('#sub-title').setHTML(visual.title);

    var params = {};

    var startDate = new Y.Calendar({
        contentBox: '#start-date',
        date: new Date(),
        on: {
            'selectionChange': function(e) {
                params.ten = e.newSelection[0].valueOf();
            }
        }
    }).render();

    var endDate = new Y.Calendar({
        contentBox: '#end-date',
        date: new Date(),
        on: {
            'selectionChange': function(e) {
                params.zero = e.newSelection[0].valueOf();
            }
        }
    }).render();

    var submitButton = new Y.Button({
        srcNode: '#submit',
        on: {
            'click': function() {
                params.title = Y.one('#title').get('value');
                var hash = btoa(JSON.stringify(params));
                window.location.assign('#' + hash);
                window.location.reload(true);
            }
        }
    }).render();
});
