(function() {
    var spd = 60 * 60 * 24;
    var sph = 60 * 60;
    var spm = 60;
    var mspd = spd * 1000;

    var Blocks = function(selector, props) {
        this.zero = props.zero;
        this.title = props.title;
        this.blockHeight = props.blockHeight || '25px';
        this.blockWidth = props.blockWidth || '25px';
        var container = d3.select(selector)
            .append('div')
                .attr('class', 'countdown-blocks');
        this.blocksContainer = container
            .append('div')
                .attr('class', 'blocks-box');
        this.update();
    }

    Blocks.prototype = {
        update: function() {
            var current = new Date();
            this.timeLeft = this.zero - current
            var dif = this.timeLeft / 1000;
            if (dif < 0) { dif = 0; }
            this.daysLeft = Math.floor(dif / spd);
            this.hoursLeft = Math.floor((dif % spd) / sph);
            this.minutesLeft = Math.floor((dif % sph) / spm);
            this.secondsLeft = Math.floor(dif % spm);
            
            var daysElement = this.blocksContainer
                .selectAll('div.days-box')
                    .data(new Array(this.daysLeft));
            daysElement.enter()
                .insert('div')
                .attr('class', 'box days-box')
                .style('height', this.blockHeight)
                .style('width', '0px')
                .transition().duration(750)
                .style('width', this.blockWidth);
            daysElement.exit()
                .transition().duration(750)
                .style('width', '0px')
                .remove();
            var hoursElement = this.blocksContainer
                .selectAll('div.hours-box')
                    .data(new Array(this.hoursLeft));
            hoursElement.enter()
                .insert('div')
                .attr('class', 'box hours-box')
                .style('height', this.blockHeight)
                .style('width', '0px')
                .transition().duration(750)
                .style('width', this.blockWidth);
            hoursElement.exit()
                .transition().duration(750)
                .style('width', '0px')
                .remove();
            var minutesElement = this.blocksContainer
                .selectAll('div.minutes-box')
                    .data(new Array(this.minutesLeft));
            minutesElement.enter()
                .insert('div')
                .attr('class', 'box minutes-box')
                .style('height', this.blockHeight)
                .style('width', '0px')
                .transition().duration(750)
                .style('width', this.blockWidth);
            minutesElement.exit()
                .transition().duration(750)
                .style('width', '0px')
                .remove();
            var secondsElement = this.blocksContainer
                .selectAll('div.seconds-box')
                    .data(new Array(this.secondsLeft));
            secondsElement.enter()
                .insert('div')
                .attr('class', 'box seconds-box')
                .style('height', this.blockHeight)
                .style('width', '0px')
                .transition().duration(750)
                .style('width', this.blockWidth);
            secondsElement.exit()
                .transition().duration(750)
                .style('width', '0px')
                .remove();
            return this;
        },

        run: function(callback) {
            // The optional callback function will be called and passed the
            // countdown object each time the state is updated.
            var self = this;
            this.intervalID = setInterval(function() {
                self.update();
                if (callback !== undefined) {
                    callback(self);
                }
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
            props.ten = props.ten;
            props.zero = props.zero || new Date((new Date()).valueOf() + 5 * mspd);
            props.title = props.title || '???';
            switch(type) {
                case 'blocks':
                    return new Blocks(selector, props);
                    break;
                case 'circles': 
                    return new Circle(selector, props);
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
