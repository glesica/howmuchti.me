(function() {
    var spd = 60 * 60 * 24;
    var sph = 60 * 60;
    var spm = 60;
    var mspd = spd * 1000;

    var Blocks = function(selector, props) {
        this.zero = props.zero;
        this.title = props.title;
        var container = d3.select(selector)
            .append('div')
                .attr('class', 'countdown-blocks');
        if (this.title) {
            this.titleContainer = container
                .append('div')
                    .attr('class', 'title-box')
                    .text(this.title);
        }
        this.daysContainer = container
            .append('div')
                .attr('class', 'days-box');
        this.daysContainer
            .append('span')
                .text('Days');
        this.hoursContainer = container
            .append('div')
                .attr('class', 'hours-box');
        this.hoursContainer
            .append('span')
                .text('Hours');
        this.minutesContainer = container
            .append('div')
                .attr('class', 'minutes-box');
        this.minutesContainer
            .append('span')
                .text('Minutes');
        this.secondsContainer = container
            .append('div')
                .attr('class', 'seconds-box');
        this.secondsContainer
            .append('span')
                .text('Seconds');
        this.update();
    }

    Blocks.prototype = {
        update: function() {
            var current = new Date();

            var dif = (this.zero - current) / 1000;
            if (dif < 0) { dif = 0; }
            var days = Math.floor(dif / spd);
            var hours = Math.floor((dif % spd) / sph);
            var minutes = Math.floor((dif % sph) / spm);
            var seconds = Math.floor(dif % spm);
            
            var daysElement = this.daysContainer
                .selectAll('div')
                    .data(new Array(days));
            daysElement.enter()
                .insert('div', 'span')
                .attr('class', 'box')
                .style('width', '0px')
                .transition().duration(750)
                .style('width', '25px');
            daysElement.exit()
                .transition().duration(750)
                .style('width', '0px')
                .remove();
            var hoursElement = this.hoursContainer
                .selectAll('div')
                    .data(new Array(hours));
            hoursElement.enter()
                .insert('div', 'span')
                .attr('class', 'box')
                .style('width', '0px')
                .transition().duration(750)
                .style('width', '25px');
            hoursElement.exit()
                .transition().duration(750)
                .style('width', '0px')
                .remove();
            var minutesElement = this.minutesContainer
                .selectAll('div')
                    .data(new Array(minutes));
            minutesElement.enter()
                .insert('div', 'span')
                .attr('class', 'box')
                .style('width', '0px')
                .transition().duration(750)
                .style('width', '25px');
            minutesElement.exit()
                .transition().duration(750)
                .style('width', '0px')
                .remove();
            var secondsElement = this.secondsContainer
                .selectAll('div')
                    .data(new Array(seconds));
            secondsElement.enter()
                .insert('div', 'span')
                .attr('class', 'box')
                .style('width', '0px')
                .transition().duration(750)
                .style('width', '25px');
            secondsElement.exit()
                .transition().duration(750)
                .style('width', '0px')
                .remove();
            return this;
        },

        run: function() {
            var self = this;
            this.intervalID = setInterval(function() {
                self.update();
            }, 1000);
            return this;
        },

        stop: function() {
            clearInterval(this.intervalId);
            return this;
        }
    };

    var Circles = function(selection, props) {
        this.ten = props.ten;
        this.zero = props.zero;
        this.title = props.title;
        var container = d3.select(selector);
        if (this.title) {
            this.titleContainer = container
                .append('div')
                    .attr('class', 'title-box')
                    .text(this.title);
        }
    };

    countdown = {
        create: function(type, selector, props) {
            if (selector === undefined) throw 'Missing parameter: selector';
            p = {};
            p.ten = props.ten;
            p.zero = props.zero || new Date((new Date()).valueOf() + 5 * mspd);
            p.title = props.title || '';
            switch(type) {
                case 'blocks':
                    return new Blocks(selector, p);
                    break;
                case 'circles': 
                    return new Circle(selector, p);
                    break;
            }
        },
        blocks: function(selector, props) {
            return countdown.create('blocks', selector, props);
        },
        circles: function(selection, props) {
            return countdown.create('circles', selector, props);
        }
    };
})();
