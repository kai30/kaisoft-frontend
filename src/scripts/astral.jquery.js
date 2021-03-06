/**
 * Created by qhyang on 2017/3/3.
 */

(function() {
    var WIDTH, HEIGHT, canvas, con, g;
    var pxs = [];
    var rint = 50;

    var active = true;

    $.fn.astral = function (astralAmount) {
        var that = this;

        canvas = $('<canvas></canvas>').appendTo(this);
        setup(this, astralAmount);

        return {
            pause: pause,
            resume: resume,
            resize: function () {
                WIDTH = $(that).width();
                HEIGHT = $(that).height();
                canvas.attr('width', WIDTH).attr('height', HEIGHT);
            },
            destroy: function () {
                active = false;
                $(that).find("canvas").remove();
            }
        }
    };

    function setup (container, astralAmount) {
        WIDTH = $(container).width();
        HEIGHT = $(container).height();
        con = canvas[0].getContext('2d');

        for (var i = 0; i < astralAmount; i++) {
            pxs[i] = new Circle();
            pxs[i].reset();
        }

        requestAnimationFrame(draw);
    }

    // function setup (container, astralAmount) {
    //     var windowSize = function() {
    //         WIDTH = container.innerWidth();
    //         HEIGHT = container.innerHeight();
    //         canvas = container.find('#astral');
    //         canvas.attr('width', WIDTH).attr('height', HEIGHT);
    //     };
    //
    //     windowSize();
    //
    //     $(window).resize(function() {
    //         windowSize();
    //     });
    //
    //     con = canvas[0].getContext('2d');
    //
    //     for (var i = 0; i < astralAmount; i++) {
    //         pxs[i] = new Circle();
    //         pxs[i].reset();
    //     }
    //
    //     requestAnimationFrame(draw);
    // }

    function draw () {
        con.clearRect(0, 0, WIDTH, HEIGHT);
        con.globalCompositeOperation = "lighter";

        for (var i = 0; i < pxs.length; i++) {
            pxs[i].fade();
            pxs[i].move();
            pxs[i].draw();
        }

        if (active === true) {
            requestAnimationFrame(draw);
        }
    }

    function Circle() {
        this.s = {
            ttl: 15000,
            xmax: 5,
            ymax: 2,
            rmax: 7,
            rt: 1,
            xdef: 960,
            ydef: 540,
            xdrift: 4,
            ydrift: 4,
            random: true,
            blink: true
        };

        this.reset = function() {
            this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
            this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
            this.r = ((this.s.rmax - 1) * Math.random()) + 1;

            this.dx = (Math.random() * this.s.xmax) * (Math.random() < 0.5 ? -1 : 1);
            this.dy = (Math.random() * this.s.ymax) * (Math.random() < 0.5 ? -1 : 1);

            this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
            this.rt = Math.random() * this.hl;

            this.stop = Math.random() * 0.2 + 0.4;

            this.s.rt = Math.random() + 1;
            this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
            this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
        };

        this.fade = function() {
            this.rt += this.s.rt;
        };

        this.draw = function() {
            var newo, cr;

            if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) {
                this.s.rt = this.s.rt * -1;
            }
            else if (this.rt >= this.hl) {
                this.reset();
            }

            newo = 1 - (this.rt / this.hl);

            con.beginPath();
            con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            con.closePath();

            cr = this.r * newo;

            g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
            g.addColorStop(0.0, 'rgba(193,254,254,' + newo + ')');
            g.addColorStop(this.stop, 'rgba(193,254,254,' + (newo * 0.2) + ')');
            g.addColorStop(1.0, 'rgba(193,254,254,0)');

            con.fillStyle = g;
            con.fill();
        };

        this.move = function() {
            this.x += (this.rt / this.hl) * this.dx;
            this.y += (this.rt / this.hl) * this.dy;
            if (this.x > WIDTH || this.x < 0) this.dx *= -1;
            if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
        };

        this.getX = function() {
            return this.x;
        };

        this.getY = function() {
            return this.y;
        };
    }
    
    function pause() {
        active = false;
    }

    function resume() {
        active = false;
        requestAnimationFrame(function () {
            active = true;
            requestAnimationFrame(draw);
        });
    }
})();