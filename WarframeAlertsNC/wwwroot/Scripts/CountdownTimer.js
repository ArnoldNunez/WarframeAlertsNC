// Countdown Timer Class
function CountDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
}

CountDownTimer.prototype.start = function () {
    if (this.running) {
        return;
    }

    this.running = true;
    let start = Date.now();
    let that = this;
    let diff;
    let obj;

    (function timer() {
        diff = that.duration - (((Date.now() - start) / 1000) | 0);

        if (diff > 1) {
            setTimeout(timer, that.granularity);
        } else {
            that.running = false;
        }

        obj = CountDownTimer.parse(diff);
        that.tickFtns.forEach(function (ftn) {
            ftn.call(this, obj.days, obj.hours, obj.minutes, obj.seconds);
        }, that);
    }());
};

CountDownTimer.prototype.onTick = function (ftn) {
    if (typeof ftn === 'function') {
        this.tickFtns.push(ftn);
    }
    return this;
};

CountDownTimer.prototype.expired = function () {
    return !this.running;
};

CountDownTimer.parse = function (seconds) {
    let sec = seconds;

    let days = Math.floor(sec / (3600 * 24)) | 0;
    days = days === 0 ? "" : days;
    sec -= days * 3600 * 24;

    let hrs = Math.floor(sec / 3600) | 0;
    hrs = hrs < 10 ? "0" + hrs : hrs;
    sec -= hrs * 3600;

    let minutes = Math.floor(sec / 60) | 0;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    sec -= minutes * 60;

    sec = (sec % 60) | 0;
    sec = sec < 10 ? "0" + sec : sec;

    return {
        'days': days,
        'hours': hrs,
        'minutes': minutes,
        'seconds': sec
    };
};